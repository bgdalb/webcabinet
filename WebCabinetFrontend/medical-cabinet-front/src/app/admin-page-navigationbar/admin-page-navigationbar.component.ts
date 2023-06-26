import { Component, EventEmitter, Output } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { CustomMessages } from 'src/utilities/custom_messages';

@Component({
  selector: 'app-admin-page-navigationbar',
  templateUrl: './admin-page-navigationbar.component.html',
  styleUrls: ['./admin-page-navigationbar.component.scss']
})
export class AdminPageNavigationbarComponent {
  constructor(private scrollService: ScrollService) {}

  scrollToSection(section: string) {
    this.scrollService.scrollToSection(section);
  }

  @Output() viewChanged: EventEmitter<string> = new EventEmitter<string>();

  selectPatientsView() {
    this.viewChanged.emit('patients');
  }

  selectDoctorsView() {
    this.viewChanged.emit('doctors');
  }

  selectServicesView() {
    this.viewChanged.emit('services');
  }

  selectAppointmentsView() {
    this.viewChanged.emit('appointments');
  }

  nameOfTheSite = CustomMessages.nameOfTheSite;
}
