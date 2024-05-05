import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimSingleMatchComponent } from './nim-single-match.component';

describe('NimSingleMatchComponent', () => {
  let component: NimSingleMatchComponent;
  let fixture: ComponentFixture<NimSingleMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
