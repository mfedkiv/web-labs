import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  form: FormGroup = {} as FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      date: ''
    })
  }

  submitHandler(): void {
    const headers = {
      'Authorization': `Bearer ${window.localStorage['accessToken']}`
    }
    this.http.post('http://127.0.0.1:5000/events', this.form.getRawValue(), {headers})
      .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: () => {
            alert('Oops something went wrong!');
          }
        }
      );
  }

}
