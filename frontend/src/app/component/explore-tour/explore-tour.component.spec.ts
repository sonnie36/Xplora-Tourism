import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreTourComponent } from './explore-tour.component';

describe('ExploreTourComponent', () => {
  let component: ExploreTourComponent;
  let fixture: ComponentFixture<ExploreTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
