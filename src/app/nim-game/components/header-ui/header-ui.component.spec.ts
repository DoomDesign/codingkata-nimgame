import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUIComponent } from './header-ui.component';

describe('HeaderUIComponent', () => {
  let component: HeaderUIComponent;
  let fixture: ComponentFixture<HeaderUIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderUIComponent]
    });
    fixture = TestBed.createComponent(HeaderUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
