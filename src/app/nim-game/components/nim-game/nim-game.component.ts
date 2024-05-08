import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NimGameState, NimGame } from '../../interfaces/nim-game';
import { NimGameService } from '../../services/nim-game.service';

/**
 * the game wrapper component; switches through the different game states
 */
@Component({
  selector: 'app-nim-game',
  templateUrl: './nim-game.component.html',
  styleUrls: ['./nim-game.component.scss']
})
export class NimGameComponent {

	public eNimGameState = NimGameState;

	public gameService: NimGameService = inject(NimGameService);

	public gameData$: Observable<NimGame> = this.gameService.getGameData$();

}
