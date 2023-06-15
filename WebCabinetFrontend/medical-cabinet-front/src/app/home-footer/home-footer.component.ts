import { Component } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { CustomMessages } from 'src/utilities/custom_messages';



@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss']
})
export class HomeFooterComponent {

  constructor(private scrollService: ScrollService) {}

  scrollToSection(section: string) {
    this.scrollService.scrollToSection(section);
  }

  phoneNumber = CustomMessages.phoneNumber;
  ourAdress = CustomMessages.ourAdress;
  contactEmail = CustomMessages.contactEmail;
}
