import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { formatDate } from '@angular/common'


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnChanges{
  // @ts-ignore
  @Input() element: Element;
  @Output() onEventDeleting = new EventEmitter<number>();

  form: FormGroup = {} as FormGroup;
  isOwner: boolean = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges(): void {
    // @ts-ignore
    this.isOwner = this.element.owner == window.localStorage.userId;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: this.element.title,
      date: formatDate(this.element.date,'yyyy-MM-dd','en')
    });
  }

  submitHandler(): void {
    const headers = {
      'Authorization': `Bearer ${window.localStorage['accessToken']}`
    }
    const url = `http://127.0.0.1:5000/event/${this.element.id}`;
    // @ts-ignore
    this.http.put(url, this.form.getRawValue(), {headers}).subscribe({
      next: (response: Element) => {
        this.form = this.formBuilder.group({
          title: response.title,
          date: formatDate(response.date,'yyyy-MM-dd','en')
        });
      }
    });
  }

  deleteHandler(): void {
    const headers = {
      'Authorization': `Bearer ${window.localStorage['accessToken']}`
    }
    const url = `http://127.0.0.1:5000/event/${this.element.id}`;
    this.http.delete(url, {headers})
      .subscribe({
        next: () => {
          this.onEventDeleting.emit(this.element.id);
        }
      });
  }
}

interface Element {
  id: number,
  title: string,
  date: Date,
  owner: number
}
