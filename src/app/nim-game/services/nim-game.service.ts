import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, delay, filter, takeWhile } from 'rxjs';
import { NimGame, NimGameAlert, NimGameAlertRole, NimGameDifficulty, NimGameState, Player } from '../interfaces/nim-game';
import { I18nPluralPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NimGameService {

	private _defaultNimGameData: NimGame = {
		gameRules: {
			numTotalMatches: 13,
			minSelectableMatches: 1,
			maxSelectableMatches: 3,
		},
		computerDifficulty: NimGameDifficulty.Normal,
		currentGameState: NimGameState.Start,
		currentRound: 1,
		currentPlayer: Player.Player,
		winner: null,
		lastAmountTaken: 0,
		numMatchesLeft: 13,
		playerStats: {
			'PLAYER': {
				drawnMatches: 0
			},
			'COMPUTER': {
				drawnMatches: 0
			}
		}
	}

	private _gameData !: BehaviorSubject<NimGame>;

	public readonly itemPluralMapping = {
		'match': {
			'=0': '0 matches',
			'=1': '1 match',
			'other': '# matches'
		}
	};

	private _alerts: ReplaySubject<NimGameAlert> = new ReplaySubject<NimGameAlert>();

	private _pluralPipe: I18nPluralPipe = inject(I18nPluralPipe);

	constructor() {
		this.resetGame();
	}

  /**
	 * Sets the game data back to the default initial values
	 */
	public resetGame() {
		// use a structured clone to remove any reference to child objects.
		// else, the "playerStats" child object would keep its values after each game
		const clonedDefaultData = structuredClone(this._defaultNimGameData);

		if(this._gameData == null) {
			this._gameData = new BehaviorSubject<NimGame>(clonedDefaultData);
		} else {
			this._gameData.next(structuredClone(clonedDefaultData));
		}
	}

	public setDifficulty(newDifficulty: NimGameDifficulty) {
		this.updateGame({
			computerDifficulty: newDifficulty
		})
	}

	/**
	 * sets the game state to running and lets the computer player wait for his turns
	 */
	public startGame() {
		this.updateGame({
			currentGameState: NimGameState.Running
		});

		this.initComputerPlayer();
	}

	/**
	 * updates the global game state
	 */
	private updateGame(updatedGameData: Partial<NimGame>) {
		let _currGameData = this._gameData.getValue();

		this._gameData.next({
			..._currGameData,
			...updatedGameData
		});
	}

	/**
	 * returns the global game data as an Observable
	 */
	public getGameData$(): Observable<NimGame> {
		return this._gameData.asObservable();
	}

	public getNumMatchesLeft(): number {
		const _currGameData = this._gameData.getValue();

		return _currGameData.numMatchesLeft;
	}

	/**
	 * finishes a turn and takes away the given amount of matches from the stack.
	 * checks for game over conditions and sets the game to a finished state, if true
	 */
	public endCurrentRound(numMatchesToTake: number) {

		if(!this.isValidNumMatchesToTake(numMatchesToTake)) {
			this.addAlert({
				role: NimGameAlertRole.Error,
				text: 'Invalid amount of matches',
				timeoutDuration: 5000
			})

			return;
		}

		const _updatedGameData = { ...this._gameData.getValue() };

		let infoText: string;

		switch (_updatedGameData.currentPlayer) {
			case Player.Player:
				infoText = `You took ${this._pluralPipe.transform(numMatchesToTake, this.itemPluralMapping['match'])} from the stack.`
				break;
				case Player.Computer:
				infoText = `The computer took ${this._pluralPipe.transform(numMatchesToTake, this.itemPluralMapping['match'])} from the stack.`
				break;
		}

		this.addAlert({
			role: NimGameAlertRole.Info,
			text: infoText,
			timeoutDuration: 5000
		});

		_updatedGameData.lastAmountTaken = numMatchesToTake;

		_updatedGameData.numMatchesLeft = Math.max(0, _updatedGameData.numMatchesLeft - numMatchesToTake);

		_updatedGameData.playerStats[_updatedGameData.currentPlayer].drawnMatches += numMatchesToTake;

		_updatedGameData.currentRound++;

		const _gameOver = this.isGameOver(_updatedGameData);

		if(!_gameOver) {
			_updatedGameData.currentPlayer = this.getOtherPlayer(_updatedGameData.currentPlayer);
		} else {
			_updatedGameData.currentGameState = NimGameState.Ended;

			// if game is over, the other player is the winner
			_updatedGameData.winner = this.getOtherPlayer(_updatedGameData.currentPlayer);
		}

		this.updateGame(_updatedGameData);

	}

	/**
	 * validates the given amount of matches against various rules and requirements
	 */
	private isValidNumMatchesToTake(numMatchesToTake: number): boolean {
		const _currGameData = this._gameData.getValue();

		const _isNumber = !isNaN(numMatchesToTake);

		const _isRoundNumber = numMatchesToTake % 1 === 0;

		const _equalOrAboveMin = numMatchesToTake >= _currGameData.gameRules.minSelectableMatches;
		const _equalOrBelowMax = numMatchesToTake <= _currGameData.gameRules.maxSelectableMatches;

		const _equalOrBelowLeftMatches = numMatchesToTake <= _currGameData.numMatchesLeft;

		return	_isNumber &&
						_isRoundNumber &&
						_equalOrAboveMin &&
						_equalOrBelowMax &&
						_equalOrBelowLeftMatches;
	}

	private isGameOver(gameData: NimGame): boolean {
		const _noMatchesLeft = gameData.numMatchesLeft <= 0;

		return _noMatchesLeft;
	}

	/**
	 * returns the opposite player
	 */
	private getOtherPlayer(currentPlayer: Player): Player {
		return currentPlayer === Player.Player ? Player.Computer : Player.Player;
	}

	/**
	 * sets up a subscription to the game data and executes when it's the computers turn
	 */
	private initComputerPlayer() {
		this.getGameData$().pipe(
			takeWhile(gameData => gameData.currentGameState === NimGameState.Running),
			filter(gameData => gameData.currentPlayer === Player.Computer),
			// this delay solves a race condition and lets the player rest for a bit
			// it also makes the computer seem to require some time to think
			delay(2000)
		).subscribe({
			next: (gameData) => {

				const _matchesLeft = gameData.numMatchesLeft;
				const _maxMatches = Math.min(_matchesLeft, gameData.gameRules.maxSelectableMatches);
				const _minMatches = gameData.gameRules.minSelectableMatches;

				let matchesToTake = 0;

				if(gameData.computerDifficulty === NimGameDifficulty.Hard) {
					// calculate the optimum amount of matches to take
					matchesToTake = Math.max(_minMatches , ((_matchesLeft % (_maxMatches + _minMatches)) + _maxMatches) % (_maxMatches + _minMatches));
				}

				// easy mode/fallback: choose randomly between the min and the max amount of matches
				const getRandomAmount = () => Math.floor( Math.random() * (_maxMatches - gameData.gameRules.minSelectableMatches + 1) + gameData.gameRules.minSelectableMatches );

				if(matchesToTake === 0) {
					matchesToTake = getRandomAmount();
				}

				// validate the amount; if invalid, fall back to a random amount
				let isValidAmount: boolean = this.isValidNumMatchesToTake(matchesToTake);
				while(isValidAmount === false) {
					let newAmount = getRandomAmount();
					isValidAmount = this.isValidNumMatchesToTake(newAmount);

					if(isValidAmount === true) {
						matchesToTake = newAmount;
					}
				}

				this.endCurrentRound(matchesToTake);
			}
		})
	}

	/**
	 * ends the current game, returning the player to the start screen
	 */
	public endGame() {
		this.resetGame();
	}

	public getAlerts$(): Observable<NimGameAlert> {
		return this._alerts.asObservable();
	}

	public addAlert(alert: NimGameAlert) {
		this._alerts.next(alert);
	}
}
