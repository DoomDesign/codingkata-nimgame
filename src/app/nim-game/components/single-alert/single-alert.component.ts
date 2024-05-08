import { Component, Input } from '@angular/core';
import { NimGameAlert, NimGameAlertRole } from '../../interfaces/nim-game';

/**
 * renders a single alert
 */
@Component({
  selector: 'app-single-alert',
  templateUrl: './single-alert.component.html',
  styleUrls: ['./single-alert.component.scss']
})
export class SingleAlertComponent {

	public eNimGameAlertRole = NimGameAlertRole;

	@Input({required: true}) public alert !: NimGameAlert;

}
