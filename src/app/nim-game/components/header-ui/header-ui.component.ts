import { Component, inject } from '@angular/core';
import { NimGameService } from '../../services/nim-game.service';

/**
 * renders an UI with non-relevant buttons (e.g. instructions, exit game, ...)
 */
@Component({
  selector: 'app-header-ui',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.scss']
})
export class HeaderUIComponent {

	public gameService: NimGameService = inject(NimGameService);

}
