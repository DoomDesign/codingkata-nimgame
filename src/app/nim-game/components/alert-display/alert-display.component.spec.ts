import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDisplayComponent } from './alert-display.component';
import { I18nPluralPipe } from '@angular/common';
import { SingleAlertComponent } from '../single-alert/single-alert.component';

describe('AlertDisplayComponent', () => {
  let component: AlertDisplayComponent;
  let fixture: ComponentFixture<AlertDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertDisplayComponent, SingleAlertComponent],
			providers: [
				I18nPluralPipe
			]
    });
    fixture = TestBed.createComponent(AlertDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
