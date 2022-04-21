import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCreatingNewEvent() {
    this.router.navigate(['/create-event']);
  }

  onShowMyEvents () {
    let isAllEvents = false;
    this.router.navigate(['/my-events'], {state: {isAllEvents}})
  }

  onShowAllEvents () {
    let isAllEvents = true;
    this.router.navigate(['/all-events'], {state: {isAllEvents}})
  }

}
