import { Component } from '@angular/core';
import { AddPatientDTO } from '../models/dtos/add-patient.dto';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {

  patient: any = {};

  constructor() {}

  isRegistrationValid(): boolean {
    this.patient.email = (<HTMLInputElement>document.getElementById('email')).value || '';
    this.patient.password = (<HTMLInputElement>document.getElementById('password')).value || '';
    this.patient.family_name = (<HTMLInputElement>document.getElementById('family_name')).value || '';
    this.patient.first_name = (<HTMLInputElement>document.getElementById('first_name')).value || '';
    this.patient.CNP = (<HTMLInputElement>document.getElementById('CNP')).value || '';
    this.patient.date_of_birth = (<HTMLInputElement>document.getElementById('date_of_birth')).value || '';

    console.log(this.patient);
    return true;
  }


  

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


}
