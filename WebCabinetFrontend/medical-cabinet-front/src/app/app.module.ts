import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ScrollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
