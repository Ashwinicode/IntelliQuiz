import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeModeComponent } from './change-mode.component';

describe('ChangeModeComponent', () => {
  let component: ChangeModeComponent;
  let fixture: ComponentFixture<ChangeModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
