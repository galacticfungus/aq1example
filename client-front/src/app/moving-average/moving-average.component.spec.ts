import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingAverageComponent } from './moving-average.component';

describe('MovingAverageComponent', () => {
  let component: MovingAverageComponent;
  let fixture: ComponentFixture<MovingAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovingAverageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
