import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterModalComponent } from './outer-modal.component';

describe('OuterModalComponent', () => {
  let component: OuterModalComponent;
  let fixture: ComponentFixture<OuterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
