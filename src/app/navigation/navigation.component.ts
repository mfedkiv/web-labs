import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // @ts-ignore
    this.isLoggedIn = window.localStorage.accessToken !== '';
  }

}
