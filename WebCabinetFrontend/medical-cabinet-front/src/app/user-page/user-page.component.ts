import { Component } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  selectedDoctor!: string;
  selectedService!: string;
  showCalendar: boolean = false;
  appointmentSent: boolean = false;

  userFormDoctorServiceSelected(data: { doctor: string, service: string }) {
    this.selectedDoctor = data.doctor;
    this.selectedService = data.service;
    this.showCalendar = true;
  }
  
  handleAppointmentSent() {
    this.appointmentSent = true;
  }

  goBackToAppointment(){
    this.appointmentSent = false;
    this.showCalendar = false;
  }

}
