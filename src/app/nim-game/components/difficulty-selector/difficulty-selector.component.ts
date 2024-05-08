import { Component, inject } from '@angular/core';
import { NimGameDifficulty } from '../../interfaces/nim-game';
import { NimGameService } from '../../services/nim-game.service';

/**
 * renders a switch to change the games difficulty
 */
@Component({
  selector: 'app-difficulty-selector',
  templateUrl: './difficulty-selector.component.html',
  styleUrls: ['./difficulty-selector.component.scss']
})
export class DifficultySelectorComponent {

	public eDifficulty = NimGameDifficulty;

	public gameService: NimGameService = inject(NimGameService);

	public gameData$ = this.gameService.getGameData$();

	public setDifficulty($event: Event) {
		const checked = ($event.target as HTMLInputElement)?.checked === true;

		if(!!checked) {
			this.gameService.setDifficulty(NimGameDifficulty.Hard);
		} else {
			this.gameService.setDifficulty(NimGameDifficulty.Normal);
		}
	}
}
