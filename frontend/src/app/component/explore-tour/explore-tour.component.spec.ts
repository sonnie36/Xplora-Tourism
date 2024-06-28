import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreTourComponent } from './explore-tour.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExploreTourComponent', () => {
  let component: ExploreTourComponent;
  let fixture: ComponentFixture<ExploreTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreTourComponent,HttpClientTestingModule]
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
