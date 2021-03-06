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
import { ExampleComponent } from './example/example.component';
import { DialogModule } from './dialog/dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ContentEditableFormDirective } from './directives/content-editable-form.directive';
import { PaginationComponent } from './pagination/pagination.component';
import { ListadoComponent } from './listado/listado.component';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    ExampleComponent,
    ScrollTopComponent,
    ContentEditableFormDirective,
    PaginationComponent,
    ListadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: 'API_BASE_URL', useValue: environment.API_BASE_URL },
    AuthService
  ],
  entryComponents: [
    ExampleComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
