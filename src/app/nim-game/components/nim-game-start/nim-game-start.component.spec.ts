import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimGameStartComponent } from './nim-game-start.component';
import { DifficultySelectorComponent } from '../difficulty-selector/difficulty-selector.component';
import { NimGameInstructionsComponent } from '../nim-game-instructions/nim-game-instructions.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NimGameStartComponent', () => {
  let component: NimGameStartComponent;
  let fixture: ComponentFixture<NimGameStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
				NoopAnimationsModule
			],
      declarations: [
				NimGameStartComponent,
				DifficultySelectorComponent,
				NimGameInstructionsComponent
			]
    });
    fixture = TestBed.createComponent(NimGameStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
