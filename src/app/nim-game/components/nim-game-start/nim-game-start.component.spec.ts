import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimGameStartComponent } from './nim-game-start.component';

describe('NimGameStartComponent', () => {
  let component: NimGameStartComponent;
  let fixture: ComponentFixture<NimGameStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NimGameStartComponent]
    });
    fixture = TestBed.createComponent(NimGameStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
