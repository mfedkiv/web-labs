import {EventListComponent} from './event-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [EventListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    window.history.pushState({isAllEvents: true}, 'title', '/all-events');
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete event', function () {
    component.eventList = [{
      id: 1,
      title: 'Title',
      owner: 1,
      date: new Date()
    }]
    component.deleteEvent(1);
    expect(component.eventList.length).toEqual(0);
  });
});
