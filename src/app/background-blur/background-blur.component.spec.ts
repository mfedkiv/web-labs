import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundBlurComponent } from './background-blur.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

describe('BackgroundBlurComponent', () => {
  let component: BackgroundBlurComponent;
  let fixture: ComponentFixture<BackgroundBlurComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ BackgroundBlurComponent ],
      providers: [
        { provide: Router, useValue: mockRouter},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundBlurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to main page', function () {
    component.onClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
