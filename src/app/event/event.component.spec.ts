import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventComponent } from './event.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {formatDate} from "@angular/common";

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [ EventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    component.element = {
      id: 1,
      title: 'Title',
      owner: 1,
      date: new Date()
    }
    component.isOwner = true;
    fixture.detectChanges();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make put request', function () {
    component.submitHandler();
    const req = httpTestingController.expectOne('http://127.0.0.1:5000/event/1');
    expect(req.request.method).toEqual('PUT');
  });

  it('should make delete request', function () {
    component.element.id = 2;
    component.deleteHandler();
    const req = httpTestingController.expectOne('http://127.0.0.1:5000/event/2');
    expect(req.request.method).toEqual('DELETE');
  });

  it('should make property isOwner to equal true', function () {
    // @ts-ignore
    window.localStorage.userId = 1;
    component.ngOnChanges();
    expect(component.isOwner).toBeTruthy();
  });

  it('should make property isOwner to equal false', function () {
    // @ts-ignore
    window.localStorage.userId = 2;
    component.ngOnChanges();
    expect(component.isOwner).toBeFalsy();
  });

  it('should make form', function () {
    const formBuilder = new FormBuilder();
    const form = formBuilder.group({
      title: component.element.title,
      date: formatDate(component.element.date,'yyyy-MM-dd','en')
    });
    component.ngOnInit();
    expect(component.form.getRawValue()).toEqual(form.getRawValue());
  });
});
