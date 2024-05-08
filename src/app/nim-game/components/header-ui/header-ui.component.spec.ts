import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUIComponent } from './header-ui.component';
import { NimGameInstructionsComponent } from '../nim-game-instructions/nim-game-instructions.component';
import { I18nPluralPipe } from '@angular/common';

describe('HeaderUIComponent', () => {
  let component: HeaderUIComponent;
  let fixture: ComponentFixture<HeaderUIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
				HeaderUIComponent,
				NimGameInstructionsComponent
			],
			providers: [
				I18nPluralPipe
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
