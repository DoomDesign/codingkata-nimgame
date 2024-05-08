import { AfterViewInit, Component, OnDestroy, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NimGameService } from '../../services/nim-game.service';
import { Subject, takeUntil } from 'rxjs';
import { NimGameAlert } from '../../interfaces/nim-game';
import { SingleAlertComponent } from '../single-alert/single-alert.component';

@Component({
  selector: 'app-alert-display',
  templateUrl: './alert-display.component.html',
  styleUrls: ['./alert-display.component.scss']
})
export class AlertDisplayComponent implements AfterViewInit, OnDestroy {

	@ViewChild('alerts', { static: true, read: ViewContainerRef }) alertsContainer!: ViewContainerRef;

	private gameService: NimGameService = inject(NimGameService);

	private _unsubscribe$: Subject<void> = new Subject<void>();

	ngAfterViewInit(): void {
		this.gameService.getAlerts$().pipe(
			takeUntil(this._unsubscribe$),
		).subscribe({
			next: (alert: NimGameAlert) => {
				const newAlertComponent = this.alertsContainer.createComponent(SingleAlertComponent);
				newAlertComponent.instance.alert = alert;

				setTimeout(() => {
					newAlertComponent.destroy();
				}, alert.timeoutDuration ?? 10000);
			},
			complete: () => {
				this.alertsContainer.clear();
			}
		})
	}

	ngOnDestroy(): void {
			this._unsubscribe$?.next();
			this._unsubscribe$?.complete();
	}
}
