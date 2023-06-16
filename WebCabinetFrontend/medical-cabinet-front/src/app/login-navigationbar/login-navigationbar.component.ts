import { Component } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { CustomMessages } from 'src/utilities/custom_messages';

@Component({
  selector: 'app-login-navigationbar',
  templateUrl: './login-navigationbar.component.html',
  styleUrls: ['./login-navigationbar.component.scss']
})
export class LoginNavigationbarComponent {

  
  constructor(private scrollService: ScrollService) {}

  scrollToSection(section: string) {
    this.scrollService.scrollToSection(section);
  }

  nameOfTheSite = CustomMessages.nameOfTheSite;
}
