import { Component } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { CustomMessages } from 'src/utilities/custom_messages';

@Component({
  selector: 'app-user-page-navigationbar',
  templateUrl: './user-page-navigationbar.component.html',
  styleUrls: ['./user-page-navigationbar.component.scss']
})
export class UserPageNavigationbarComponent {

  constructor(private scrollService: ScrollService) {}

  scrollToSection(section: string) {
    this.scrollService.scrollToSection(section);
  }

  nameOfTheSite = CustomMessages.nameOfTheSite;
}
