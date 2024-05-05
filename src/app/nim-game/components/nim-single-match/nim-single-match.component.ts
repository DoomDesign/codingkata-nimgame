import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NimGame } from '../../interfaces/nim-game';
import { NimGameService } from '../../services/nim-game.service';

@Component({
  selector: 'app-nim-single-match',
  templateUrl: './nim-single-match.component.html',
  styleUrls: ['./nim-single-match.component.scss']
})
export class NimSingleMatchComponent {

	@Input() public selected: boolean = false;

	@Input() public selectable: boolean = false;

	@Input() public taken: boolean = false;

	@Output() onSelect = new EventEmitter<void>();

	public gameService: NimGameService = inject(NimGameService);

	public gameData$: Observable<NimGame> = this.gameService.getGameData$();

	public select() {
		this.onSelect.emit();
	}
}
