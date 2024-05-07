import { Component, Input, OnInit, inject } from '@angular/core';
import { NimGamePlayerStats, Player } from '../../interfaces/nim-game';
import { NimGameService } from '../../services/nim-game.service';
import { Observable, combineLatest, map, of } from 'rxjs';
import { listStaggerChildren } from '../../animations';

@Component({
  selector: 'app-nim-game-player-ui',
  templateUrl: './nim-game-player-ui.component.html',
  styleUrls: ['./nim-game-player-ui.component.scss'],
	animations: [
		listStaggerChildren
	]
})
export class NimGamePlayerUiComponent implements OnInit {

	public ePlayer = Player;

	@Input({required: true}) public playerToDisplay !: Player;

	private _gameService: NimGameService = inject(NimGameService);

	public playerMatchesDrawn$ !: Observable<Array<null>>;

	ngOnInit(): void {
		this.playerMatchesDrawn$ = combineLatest({
			playerToDisplay: of(this.playerToDisplay),
			gameData: this._gameService.getGameData$()
		}).pipe(
			map(({playerToDisplay, gameData}) => {
				if(!playerToDisplay || !gameData) {
					return [ ];
				}

				return new Array(gameData.playerStats[playerToDisplay].drawnMatches).fill(null);

			})
		)
	}

}
