import { Component, inject } from '@angular/core';
import { NimGameService } from '../../services/nim-game.service';

@Component({
  selector: 'app-nim-game-start',
  templateUrl: './nim-game-start.component.html',
  styleUrls: ['./nim-game-start.component.scss']
})
export class NimGameStartComponent {

	public gameService: NimGameService = inject(NimGameService);

}
