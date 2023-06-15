import { Component } from '@angular/core';
import { CustomMessages } from './../utilities/custom_messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router){}

  title = 'medical-cabinet-front';
  workingHours = CustomMessages.workingHours;
  contactEmail = CustomMessages.contactEmail;
  phoneNumber = CustomMessages.phoneNumber;
  ourAdress = CustomMessages.ourAdress;
  nameOfTheSite = CustomMessages.nameOfTheSite;



  navigateToRegistration(): void {
    this.router.navigate(['/registration']);
  }

}

