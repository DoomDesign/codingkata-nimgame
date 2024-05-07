import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimGameInstructionsComponent } from './nim-game-instructions.component';

describe('NimGameInstructionsComponent', () => {
  let component: NimGameInstructionsComponent;
  let fixture: ComponentFixture<NimGameInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NimGameInstructionsComponent]
    });
    fixture = TestBed.createComponent(NimGameInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
