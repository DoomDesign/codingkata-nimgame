import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, filter, takeWhile } from 'rxjs';
import { NimGame, NimGameDifficulty, NimGameState, Player } from '../interfaces/nim-game';

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

	constructor() {
		this.resetGame();
	}

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

	public startGame() {
		this.updateGame({
			currentGameState: NimGameState.Running
		});

		this.initComputerPlayer();
	}

	private updateGame(updatedGameData: Partial<NimGame>) {
		let _currGameData = this._gameData.getValue();

		this._gameData.next({
			..._currGameData,
			...updatedGameData
		});

		console.log({gameData: this._gameData.getValue()});
	}

	public getGameData$(): Observable<NimGame> {
		return this._gameData.asObservable();
	}

	public getNumMatchesLeft(): number {
		const _currGameData = this._gameData.getValue();

		return _currGameData.numMatchesLeft;
	}

	public endCurrentRound(numMatchesToTake: number) {
		// TODO: check for valid amount with numMatchesLeft AND maxSelectableMatches
		if(!this.isValidNumMatchesToTake(numMatchesToTake)) {
			// TODO: display error message
			console.error("Invalid number of selected matches");
			return;
		}

		const _updatedGameData = { ...this._gameData.getValue() };

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

	private getOtherPlayer(currentPlayer: Player): Player {
		return currentPlayer === Player.Player ? Player.Computer : Player.Player;
	}

	private initComputerPlayer() {
		this.getGameData$().pipe(
			takeWhile(gameData => gameData.currentGameState === NimGameState.Running),
			filter(gameData => gameData.currentPlayer === Player.Computer),
			// this delay solves a race condition and lets the player rest for a bit
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
				if(matchesToTake === 0) {
					matchesToTake = Math.floor( Math.random() * (_maxMatches - gameData.gameRules.minSelectableMatches + 1) + gameData.gameRules.minSelectableMatches );
				}

				this.endCurrentRound(matchesToTake);
			}
		})
	}

	public endGame() {
		this.resetGame();
	}
}
