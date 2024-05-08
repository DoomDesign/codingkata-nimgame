import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimGameEndComponent } from './nim-game-end.component';
import { I18nPluralPipe } from '@angular/common';

describe('NimGameEndComponent', () => {
  let component: NimGameEndComponent;
  let fixture: ComponentFixture<NimGameEndComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NimGameEndComponent],
			providers: [
				I18nPluralPipe
			]
    });
    fixture = TestBed.createComponent(NimGameEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
