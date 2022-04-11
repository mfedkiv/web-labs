import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  form: FormGroup = {} as FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  )
  { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  submitHandler() {
    this.http.post('http://127.0.0.1:5000/login', this.form.getRawValue())
      .subscribe({
          next: (data) => {
            // @ts-ignore
            window.localStorage.accessToken = data.access_token;
            this.router.navigate(['/user']);
          },
          error: (errorResponse) => {
            this.errorMessage = errorResponse.error.message
          }
        }
      )
  }

}
