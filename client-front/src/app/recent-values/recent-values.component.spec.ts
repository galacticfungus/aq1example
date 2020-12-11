import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentValuesComponent } from './recent-values.component';

describe('RecentValuesComponent', () => {
  let component: RecentValuesComponent;
  let fixture: ComponentFixture<RecentValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
