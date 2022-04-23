import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MainComponent ],
      providers: [
        { provide: Router, useValue: mockRouter},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to create event', function () {
    component.onCreatingNewEvent();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/create-event'])
  });
  it('should navigate to my events', function () {
    let isAllEvents = false;
    component.onShowMyEvents();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/my-events'], {state: {isAllEvents}})
  });
  it('should navigate to all events', function () {
    let isAllEvents = true;
    component.onShowAllEvents();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/all-events'], {state: {isAllEvents}})
  });
});
