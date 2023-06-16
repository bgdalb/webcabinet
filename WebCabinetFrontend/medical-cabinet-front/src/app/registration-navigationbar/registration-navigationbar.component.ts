import { Component } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { CustomMessages } from 'src/utilities/custom_messages';

@Component({
  selector: 'app-registration-navigationbar',
  templateUrl: './registration-navigationbar.component.html',
  styleUrls: ['./registration-navigationbar.component.scss']
})
export class RegistrationNavigationbarComponent {

  constructor(private scrollService: ScrollService) {}

  scrollToSection(section: string) {
    this.scrollService.scrollToSection(section);
  }

  nameOfTheSite = CustomMessages.nameOfTheSite;
}
