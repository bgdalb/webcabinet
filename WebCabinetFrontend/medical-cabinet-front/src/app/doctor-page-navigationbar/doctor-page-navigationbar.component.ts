import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { CustomMessages } from 'src/utilities/custom_messages';

@Component({
  selector: 'app-doctor-page-navigationbar',
  templateUrl: './doctor-page-navigationbar.component.html',
  styleUrls: ['./doctor-page-navigationbar.component.scss']
})
export class DoctorPageNavigationbarComponent {

  @Input() showPatientView: boolean = true;
  @Output() toggleView: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private scrollService: ScrollService) {}

  scrollToSection(section: string) {
    this.scrollService.scrollToSection(section);
  }

  nameOfTheSite = CustomMessages.nameOfTheSite;
}
