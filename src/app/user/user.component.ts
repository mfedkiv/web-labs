import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  confirmPasswordInput: string = '';
  errorMessage: string = '';
  isEqualPassword: boolean = true;
  canBeDisplayed: boolean = false;

  form: FormGroup = {} as FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      surname: '',
      username: '',
      password: ''
    });
    const headers = {
      'Authorization': `Bearer ${window.localStorage['accessToken']}`
    }
    // @ts-ignore
    this.http.get('http://127.0.0.1:5000/user', {headers}).subscribe({
      next: (response: Response) => {
        this.form = this.formBuilder.group({
          name: response.name,
          surname: response.surname,
          username: response.username,
          password: ''
        });
      }
    });
  }

  checkInput(): void {
    const password = this.form.getRawValue().password;
    this.canBeDisplayed = !(password === '' && this.confirmPasswordInput === '');
    this.isEqualPassword = this.confirmPasswordInput === password;
  }

  submitHandler(): void {
    const headers = {
      'Authorization': `Bearer ${window.localStorage['accessToken']}`
    }
    // @ts-ignore
    this.http.put('http://127.0.0.1:5000/user', this.form.getRawValue(), {headers}).subscribe({
      next: (response: Response) => {
        this.form = this.formBuilder.group({
          name: response.name,
          surname: response.surname,
          username: response.username,
          password: ''
        });
        this.canBeDisplayed = false;
        this.confirmPasswordInput = '';
        this.errorMessage = '';
      },
      error: (errorResponse) => {
        this.errorMessage = errorResponse.error.message;
      }
    });
  }

  deleteHandler(): void {
    const headers = {
      'Authorization': `Bearer ${window.localStorage['accessToken']}`
    }
    this.http.delete('http://127.0.0.1:5000/user', {headers}).subscribe({
      next: () => {
        this.router.navigate(['/registration']);
      }
    });
  }

  logoutHandler(): void {
    const headers = {
      'Authorization': `Bearer ${window.localStorage['accessToken']}`
    }
    this.http.delete('http://127.0.0.1:5000/logout', {headers}).subscribe({
      next: () => {
        window.localStorage['accessToken'] = '';
        this.router.navigate(['/login']);
      }
    });
  }
}

interface Response {
  name: string,
  surname: string,
  username: string
}
