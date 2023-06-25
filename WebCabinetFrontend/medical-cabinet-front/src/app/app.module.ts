import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeTopbarComponent } from './home-topbar/home-topbar.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { SearchOverlayComponent } from './search-overlay/search-overlay.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeAboutComponent } from './home-about/home-about.component';
import { HomeServiceComponent } from './home-service/home-service.component';
import { HomeTeamComponent } from './home-team/home-team.component';
import { ScrollService } from './scroll.service';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { HomeComponent } from './home/home.component';
import { RegistrationNavigationbarComponent } from './registration-navigationbar/registration-navigationbar.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { LoginNavigationbarComponent } from './login-navigationbar/login-navigationbar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserPageNavigationbarComponent } from './user-page-navigationbar/user-page-navigationbar.component';
import { UserPageCalendarComponent } from './user-page-calendar/user-page-calendar.component';
import { UserPageFormComponent } from './user-page-form/user-page-form.component';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { DoctorPageNavigationbarComponent } from './doctor-page-navigationbar/doctor-page-navigationbar.component';
import { DoctorPagePatientviewComponent } from './doctor-page-patientview/doctor-page-patientview.component';
import { DoctorPageCalendarComponent } from './doctor-page-calendar/doctor-page-calendar.component';
import { DoctorPageMedicalhistoryComponent } from './doctor-page-medicalhistory/doctor-page-medicalhistory.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminPageNavigationbarComponent } from './admin-page-navigationbar/admin-page-navigationbar.component';
import { AdminPagePatientviewComponent } from './admin-page-patientview/admin-page-patientview.component';
import { AdminPageDoctorviewComponent } from './admin-page-doctorview/admin-page-doctorview.component';
import { AdminPageServiceviewComponent } from './admin-page-serviceview/admin-page-serviceview.component';
import { AdminPageAppointmentviewComponent } from './admin-page-appointmentview/admin-page-appointmentview.component';
import { AdminPageEditpatientComponent } from './admin-page-editpatient/admin-page-editpatient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { RegistrationSuccesBlockComponent } from './registration-succes-block/registration-succes-block.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomeTopbarComponent,
    HomeNavbarComponent,
    SearchOverlayComponent,
    HomeCarouselComponent,
    HomeBannerComponent,
    HomeAboutComponent,
    HomeServiceComponent,
    HomeTeamComponent,
    HomeFooterComponent,
    HomeComponent,
    RegistrationNavigationbarComponent,
    RegistrationFormComponent,
    LoginComponent,
    LoginNavigationbarComponent,
    LoginFormComponent,
    UserPageComponent,
    UserPageNavigationbarComponent,
    UserPageCalendarComponent,
    UserPageFormComponent,
    DoctorPageComponent,
    DoctorPageNavigationbarComponent,
    DoctorPagePatientviewComponent,
    DoctorPageCalendarComponent,
    DoctorPageMedicalhistoryComponent,
    AdminPageComponent,
    AdminPageNavigationbarComponent,
    AdminPagePatientviewComponent,
    AdminPageDoctorviewComponent,
    AdminPageServiceviewComponent,
    AdminPageAppointmentviewComponent,
    AdminPageEditpatientComponent,
    RegistrationSuccessComponent,
    RegistrationSuccesBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [ScrollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
