import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NimGameComponent } from './nim-game/components/nim-game/nim-game.component';
import { I18nPluralPipe } from '@angular/common';
import { AlertDisplayComponent } from './nim-game/components/alert-display/alert-display.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
			AppComponent,
			NimGameComponent,
			AlertDisplayComponent
		],
		providers: [
			I18nPluralPipe
		]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
