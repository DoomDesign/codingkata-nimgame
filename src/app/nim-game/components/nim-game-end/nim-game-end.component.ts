import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Player, NimGame } from '../../interfaces/nim-game';
import { NimGameService } from '../../services/nim-game.service';

/**
 * renders a dialog with the end game result
 */
@Component({
  selector: 'app-nim-game-end',
  templateUrl: './nim-game-end.component.html',
  styleUrls: ['./nim-game-end.component.scss']
})
export class NimGameEndComponent implements AfterViewInit, OnDestroy {

	public ePlayer = Player;

	@ViewChild('dialog') dialog !: ElementRef;

	public gameService: NimGameService = inject(NimGameService);
	public renderer: Renderer2 = inject(Renderer2);

	public gameData$: Observable<NimGame> = this.gameService.getGameData$();

	ngAfterViewInit(): void {
			this.renderer.listen(this.dialog?.nativeElement, 'cancel', (event) => {
				event.preventDefault();
			});

			this.dialog?.nativeElement?.showModal();
	}

	ngOnDestroy(): void {
			this.dialog?.nativeElement?.close();
	}

	public endGame() {
		this.gameService.endGame();
	}

}
