import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUIComponent } from './header-ui.component';
import { NimGameInstructionsComponent } from '../nim-game-instructions/nim-game-instructions.component';

describe('HeaderUIComponent', () => {
  let component: HeaderUIComponent;
  let fixture: ComponentFixture<HeaderUIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
				HeaderUIComponent,
				NimGameInstructionsComponent
			]
    });
    fixture = TestBed.createComponent(HeaderUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
