import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimGameActiveGameComponent } from './nim-game-active-game.component';
import { NimSingleMatchComponent } from '../nim-single-match/nim-single-match.component';

describe('NimGameActiveGameComponent', () => {
  let component: NimGameActiveGameComponent;
  let fixture: ComponentFixture<NimGameActiveGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
				NimGameActiveGameComponent,
				NimSingleMatchComponent
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
