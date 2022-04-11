import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegistrationComponent implements OnInit {
  confirmPasswordInput: string = '';
  isEqualPassword: boolean = false;
  canBeDisplayed: boolean = false;
  canBeClicked: boolean = false;
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
      name: '',
      surname: '',
      username: '',
      password: ''
    })
  }

  checkInput() {
    const passwordInput = this.form.getRawValue().password;
    if (passwordInput === '' && this.confirmPasswordInput === '') {
      this.canBeDisplayed = false;
    } else {
      this.canBeDisplayed = true;
      this.isEqualPassword = this.confirmPasswordInput === passwordInput;
    }

    this.canBeClicked = this.canBeDisplayed && this.isEqualPassword;
  }

  submitHandler() {
    this.http.post('http://127.0.0.1:5000/register', this.form.getRawValue())
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
      );
  }
}
