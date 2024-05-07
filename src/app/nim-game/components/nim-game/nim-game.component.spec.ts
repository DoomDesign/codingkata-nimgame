import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimGameComponent } from './nim-game.component';
import { NimGameStartComponent } from '../nim-game-start/nim-game-start.component';
import { NimGameActiveGameComponent } from '../nim-game-active-game/nim-game-active-game.component';
import { NimGameEndComponent } from '../nim-game-end/nim-game-end.component';
import { DifficultySelectorComponent } from '../difficulty-selector/difficulty-selector.component';
import { NimGameInstructionsComponent } from '../nim-game-instructions/nim-game-instructions.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NimGameComponent', () => {
  let component: NimGameComponent;
  let fixture: ComponentFixture<NimGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
				NoopAnimationsModule
			],
      declarations: [
				NimGameComponent,
				NimGameStartComponent,
				NimGameActiveGameComponent,
				NimGameEndComponent,
				DifficultySelectorComponent,
				NimGameInstructionsComponent
			]
    });
    fixture = TestBed.createComponent(NimGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
