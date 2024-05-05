import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Player, NimGame } from '../../interfaces/nim-game';
import { NimGameService } from '../../services/nim-game.service';

@Component({
  selector: 'app-nim-game-end',
  templateUrl: './nim-game-end.component.html',
  styleUrls: ['./nim-game-end.component.scss']
})
export class NimGameEndComponent {

	public ePlayer = Player;

	public gameService: NimGameService = inject(NimGameService);

	public gameData$: Observable<NimGame> = this.gameService.getGameData$();

	public endGame() {
		this.gameService.endGame();
	}

}
