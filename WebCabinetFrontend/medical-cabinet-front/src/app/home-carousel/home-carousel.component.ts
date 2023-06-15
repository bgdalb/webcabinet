import { Component } from '@angular/core';
import { ScrollService } from '../scroll.service';





@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent {

  constructor(private scrollService: ScrollService) {}

  scrollToSection(section: string) {
    this.scrollService.scrollToSection(section);
  }

}
