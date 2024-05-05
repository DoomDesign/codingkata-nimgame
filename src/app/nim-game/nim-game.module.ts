import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NimGameComponent } from './components/nim-game/nim-game.component';
import { NimGameStartComponent } from './components/nim-game-start/nim-game-start.component';
import { NimGameActiveGameComponent } from './components/nim-game-active-game/nim-game-active-game.component';
import { NimGameEndComponent } from './components/nim-game-end/nim-game-end.component';
import { NimSingleMatchComponent } from './components/nim-single-match/nim-single-match.component';
import { NimGameService } from './services/nim-game.service';



@NgModule({
  declarations: [
		NimGameComponent,
		NimGameStartComponent,
		NimGameActiveGameComponent,
		NimGameEndComponent,
		NimSingleMatchComponent
	],
	exports: [
		NimGameComponent
	],
  imports: [
    CommonModule,
  ],
	providers: [
		NimGameService
	]
})
export class NimGameModule { }
