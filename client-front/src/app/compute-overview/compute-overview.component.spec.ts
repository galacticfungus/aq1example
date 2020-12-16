import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputeOverviewComponent } from './compute-overview.component';

describe('ComputeOverviewComponent', () => {
  let component: ComputeOverviewComponent;
  let fixture: ComponentFixture<ComputeOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputeOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
