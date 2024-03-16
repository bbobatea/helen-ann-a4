import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HourSleptPage } from './hour-slept.page';

describe('HourSleptPage', () => {
  let component: HourSleptPage;
  let fixture: ComponentFixture<HourSleptPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HourSleptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
