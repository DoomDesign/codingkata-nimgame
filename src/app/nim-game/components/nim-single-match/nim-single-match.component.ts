import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NimGame } from '../../interfaces/nim-game';
import { NimGameService } from '../../services/nim-game.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-nim-single-match',
  templateUrl: './nim-single-match.component.html',
  styleUrls: ['./nim-single-match.component.scss'],
	animations: [
    trigger('animate', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50%)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms ease-out', style({ opacity: 0, transform: 'translateY(50%)' }))
      ])
    ])
  ],
	encapsulation: ViewEncapsulation.None
})
export class NimSingleMatchComponent {

	@HostBinding('@animate') animate = true;

	@Input() public selected: boolean = false;

	@Input() public selectable: boolean = false;

	@Input() public taken: boolean = false;

	@Input() public playable: boolean = true;

	@Output() onSelect = new EventEmitter<void>();

	public gameService: NimGameService = inject(NimGameService);

	public gameData$: Observable<NimGame> = this.gameService.getGameData$();

	public select() {
		this.onSelect.emit();
	}
}
