import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimSingleMatchComponent } from './nim-single-match.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NimSingleMatchComponent', () => {
  let component: NimSingleMatchComponent;
  let fixture: ComponentFixture<NimSingleMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
				NoopAnimationsModule
			],
      declarations: [NimSingleMatchComponent]
    });
    fixture = TestBed.createComponent(NimSingleMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
