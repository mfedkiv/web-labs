import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let httpTestingController: HttpTestingController;
  const formBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [ UserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make delete request', function () {
    component.logoutHandler();
    const req = httpTestingController.expectOne('http://127.0.0.1:5000/logout');
    expect(req.request.method).toEqual('DELETE');
  });

  it('should make form', function () {
    const form = formBuilder.group({
      name: '',
      surname: '',
      username: '',
      password: ''
    });
    component.ngOnInit();
    expect(component.form.getRawValue()).toEqual(form.getRawValue());
  });

  it('should check input', function () {
    component.confirmPasswordInput = 'a';
    component.form = formBuilder.group({
      name: '',
      surname: '',
      username: '',
      password: 'a'
    });
    component.checkInput();
    expect(component.canBeDisplayed).toBeTruthy();
    expect(component.isEqualPassword).toBeTruthy();
  });
});
