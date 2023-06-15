import { Component } from '@angular/core';
import { CustomMessages } from 'src/utilities/custom_messages';


@Component({
  selector: 'app-home-topbar',
  templateUrl: './home-topbar.component.html',
  styleUrls: ['./home-topbar.component.scss']
})
export class HomeTopbarComponent {
  workingHours = CustomMessages.workingHours;
  contactEmail = CustomMessages.contactEmail;
  phoneNumber = CustomMessages.phoneNumber;

}
