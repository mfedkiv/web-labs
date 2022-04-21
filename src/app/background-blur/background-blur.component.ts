import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-background-blur',
  templateUrl: './background-blur.component.html',
  styleUrls: ['./background-blur.component.scss']
})
export class BackgroundBlurComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick() {
    this.router.navigate(['/']);
  }
}
