import { Component } from '@angular/core';
import { CustomMessages } from 'src/utilities/custom_messages';




@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent {

  phoneNumber = CustomMessages.phoneNumber;


}
