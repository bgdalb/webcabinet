import { Component } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  selectedDoctor!: Doctor;
  selectedService!: Service;
  showCalendar: boolean = false;
  appointmentSent: boolean = false;

  userFormDoctorServiceSelected(data: { doctor: Doctor, service: Service }) {
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

interface Service
{
  serviceId : number,
  serviceName : string,
  estimatedDuration : string,
  doctorId : number

}

interface Doctor
{
  
  doctorId : number,
  familyName : string,
  name : string,
  telephone : string,
  userId : number,
  doctorTitle : string,
  picturePath : string

}