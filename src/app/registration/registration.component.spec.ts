import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";


describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let httpTestingController: HttpTestingController;
  const formBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [RegistrationComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make post request', function () {
    component.submitHandler();
    const req = httpTestingController.expectOne('http://127.0.0.1:5000/register');
    expect(req.request.method).toEqual('POST');
  });

  it('should check input', function () {
    component.confirmPasswordInput = 'password';
    component.form = formBuilder.group({
      name: '',
      surname: '',
      username: '',
      password: 'password'
    });
    component.checkInput();
    expect(component.canBeDisplayed).toBeTruthy();
    expect(component.isEqualPassword).toBeTruthy();
    expect(component.canBeClicked).toBeTruthy();
  });
});
