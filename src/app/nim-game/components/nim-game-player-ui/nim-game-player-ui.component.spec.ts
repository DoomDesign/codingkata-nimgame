import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimGamePlayerUiComponent } from './nim-game-player-ui.component';

describe('NimGamePlayerUiComponent', () => {
  let component: NimGamePlayerUiComponent;
  let fixture: ComponentFixture<NimGamePlayerUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
