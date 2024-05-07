import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, map, startWith, takeUntil, tap } from 'rxjs';
import { Player, NimGame } from '../../interfaces/nim-game';
import { NimGameService } from '../../services/nim-game.service';
import { trigger, transition, query, stagger, animateChild } from '@angular/animations';
import { I18nPluralPipe } from '@angular/common';
import { listStaggerChildren } from '../../animations';
@Component({
  selector: 'app-nim-game-active-game',
  templateUrl: './nim-game-active-game.component.html',
  styleUrls: ['./nim-game-active-game.component.scss'],
	animations: [
		listStaggerChildren
  ],
	providers: [
		I18nPluralPipe
	]
})
export class NimGameActiveGameComponent implements OnInit, OnDestroy {

	public ePlayer = Player;

	private _unsubscribe$: Subject<void> = new Subject<void>();

	public gameService: NimGameService = inject(NimGameService);

	public gameData$: Observable<NimGame> = this.gameService.getGameData$();

	private _maxSelectableAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	public maxSelectableAmount$: Observable<number> = this._maxSelectableAmount.asObservable();

	private _selectedAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	public selectedAmount$: Observable<number> = this._selectedAmount.asObservable();

	public itemPluralMapping = {
		'match': {
			'=0': '0 matches',
			'=1': '1 match',
			'other': '# matches'
		}
	};

	public numMatches$: Observable<Array<null>> = this.gameData$.pipe(
		map(gameData => new Array( gameData.gameRules.numTotalMatches ).fill(null))
	)

	ngOnInit(): void {
			this.gameData$.pipe(
				takeUntil(this._unsubscribe$)
			)
			.subscribe({
				next: (gameData) => {
					this.setMaxSelectableAccount( Math.min(gameData.numMatchesLeft, gameData.gameRules.maxSelectableMatches) );

					this.setSelectedAmount( Math.min(gameData.numMatchesLeft, gameData.gameRules.minSelectableMatches) );
				}
			})
	}

	ngOnDestroy(): void {
			this._unsubscribe$?.next();
			this._unsubscribe$?.complete();
	}

	private setMaxSelectableAccount(amount: number) {
		this._maxSelectableAmount.next(amount);
	}

	public setSelectedAmount(amount: number) {
		this._selectedAmount.next(amount);
	}

	public submitSelection() {

		const _selectedAmount = this._selectedAmount.getValue();

		if(_selectedAmount === null) {
			// TODO: error message
			return;
		}

		this.gameService.endCurrentRound(_selectedAmount);
	}

}
