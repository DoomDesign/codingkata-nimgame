import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NimGameComponent } from './components/nim-game/nim-game.component';
import { NimGameStartComponent } from './components/nim-game-start/nim-game-start.component';
import { NimGameActiveGameComponent } from './components/nim-game-active-game/nim-game-active-game.component';
import { NimGameEndComponent } from './components/nim-game-end/nim-game-end.component';
import { NimSingleMatchComponent } from './components/nim-single-match/nim-single-match.component';
import { NimGameService } from './services/nim-game.service';
import { NimGamePlayerUiComponent } from './components/nim-game-player-ui/nim-game-player-ui.component';
import { NimGameInstructionsComponent } from './components/nim-game-instructions/nim-game-instructions.component';
import { HeaderUIComponent } from './components/header-ui/header-ui.component';
import { DifficultySelectorComponent } from './components/difficulty-selector/difficulty-selector.component';



@NgModule({
  declarations: [
		NimGameComponent,
		NimGameStartComponent,
		NimGameActiveGameComponent,
		NimGameEndComponent,
		NimSingleMatchComponent,
		NimGamePlayerUiComponent,
  NimGameInstructionsComponent,
  HeaderUIComponent,
  DifficultySelectorComponent
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
