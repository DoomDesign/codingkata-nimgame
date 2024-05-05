import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NimGameComponent } from './nim-game/components/nim-game/nim-game.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
			AppComponent,
			NimGameComponent
		]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
