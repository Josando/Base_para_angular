import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './profile/profile.component';
import { AdminModule } from './admin/admin.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SampleComponent } from './sample/sample.component';
import { ModalService } from './services/modal.service';
import { DomService } from './services/dom.service';
import { DialogComponent } from './dialog/dialog.component';
import { ExampleComponent } from './example/example.component';
import { DialogModule } from './dialog/dialog.module';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    SampleComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    DialogModule
  ],
  providers: [
    { provide: 'API_BASE_URL', useValue: environment.API_BASE_URL },
    AuthService,
    ModalService,
    DomService
  ],
  entryComponents: [
    SampleComponent,
    ExampleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
