import { Component, inject } from '@angular/core';
import { NimGameService } from '../../services/nim-game.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-nim-game-start',
  templateUrl: './nim-game-start.component.html',
  styleUrls: ['./nim-game-start.component.scss'],
	animations: [
		trigger('titleanimation', [
			transition('void => *', [
				query('span.letter',
					[
						style({opacity: 0, transform: 'translateY(-50%)'}),
						stagger(100, [
								animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0%)'}))
						])
					], { optional: true }
				)
			])
		])
  ]
})
export class NimGameStartComponent {

	public gameService: NimGameService = inject(NimGameService);

}
