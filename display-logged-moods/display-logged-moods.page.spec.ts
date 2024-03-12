import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayLoggedMoodsPage } from './display-logged-moods.page';

describe('DisplayLoggedMoodsPage', () => {
  let component: DisplayLoggedMoodsPage;
  let fixture: ComponentFixture<DisplayLoggedMoodsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DisplayLoggedMoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
