import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimGameActiveGameComponent } from './nim-game-active-game.component';
import { NimSingleMatchComponent } from '../nim-single-match/nim-single-match.component';
import { HeaderUIComponent } from '../header-ui/header-ui.component';
import { NimGamePlayerUiComponent } from '../nim-game-player-ui/nim-game-player-ui.component';
import { NimGameInstructionsComponent } from '../nim-game-instructions/nim-game-instructions.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NimGameActiveGameComponent', () => {
  let component: NimGameActiveGameComponent;
  let fixture: ComponentFixture<NimGameActiveGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
				NoopAnimationsModule
			],
			declarations: [
				NimGameActiveGameComponent,
				NimSingleMatchComponent,
				HeaderUIComponent,
				NimGamePlayerUiComponent,
				NimGameInstructionsComponent
			]
    });
    fixture = TestBed.createComponent(NimGameActiveGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
