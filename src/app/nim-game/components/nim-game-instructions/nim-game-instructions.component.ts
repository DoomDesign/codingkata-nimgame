import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

/**
 * provides a button and a dialog to display the game instructions
 */
@Component({
  selector: 'app-nim-game-instructions',
  templateUrl: './nim-game-instructions.component.html',
  styleUrls: ['./nim-game-instructions.component.scss']
})
export class NimGameInstructionsComponent {

	@Input() buttonSize: 'small'|'large' = 'large';

	@HostListener('click', ['$event'])
	onDialogClick(event: PointerEvent) {
		if(event.target instanceof Element && event.target.nodeName === 'DIALOG') {
			this.closeDialog();
		}
	}

	@ViewChild('dialog') dialog !: ElementRef;

	public openDialog() {
		this.dialog?.nativeElement?.showModal();
	}
	public closeDialog() {
		this.dialog?.nativeElement?.close();
	}

}
