import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserComponent } from './user/user.component';
import { HttpClientModule} from "@angular/common/http";
import { NavigationComponent } from './navigation/navigation.component';
import { MainComponent } from './main/main.component';
import { EventComponent } from './event/event.component';
import { BackgroundBlurComponent } from './background-blur/background-blur.component';
import { EventListComponent } from './event-list/event-list.component';
import { CreateEventComponent } from './create-event/create-event.component';

const appRoutes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserComponent},
  {path: 'create-event', component: CreateEventComponent},
  {path: 'all-events', component: EventListComponent},
  {path: 'my-events', component: EventListComponent},
  {path: '', component: MainComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserComponent,
    NavigationComponent,
    MainComponent,
    EventComponent,
    BackgroundBlurComponent,
    EventListComponent,
    CreateEventComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
