import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimGamePlayerUiComponent } from './nim-game-player-ui.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NimGamePlayerUiComponent', () => {
  let component: NimGamePlayerUiComponent;
  let fixture: ComponentFixture<NimGamePlayerUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
				NoopAnimationsModule
			],
      declarations: [NimGamePlayerUiComponent]
    });
    fixture = TestBed.createComponent(NimGamePlayerUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
