import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  isAllEvents: boolean = false;
  eventList: Array<Event> = [];

  constructor(
    private http: HttpClient,
  )
  {
    this.isAllEvents = history.state.isAllEvents;
  }


  ngOnInit(): void {
    const headers = {
      'Authorization': `Bearer ${window.localStorage['accessToken']}`
    }
    let url = '';

    if (this.isAllEvents) {
      url = 'http://127.0.0.1:5000/events';
    } else {
      url = 'http://127.0.0.1:5000/user/events';
    }
    // @ts-ignore
    this.http.get(url, {headers}).subscribe({
      next: (arr: Array<Event>) => {
        for (let i = 0; i < arr.length; i++) {
          arr[i].date = new Date(arr[i].date);
        }
        this.eventList = arr;
      }
    });
  }

  deleteEvent(eventId: number) {
    for (let i = 0; i < this.eventList.length; i++) {
      if (this.eventList[i].id === eventId) {
        this.eventList.splice(i, 1);
      }
    }
  }
}

interface Event {
  id: number,
  title: string,
  date: Date,
  owner: number
}
