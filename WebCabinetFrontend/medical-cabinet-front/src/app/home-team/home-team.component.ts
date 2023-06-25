import { Component, OnInit } from '@angular/core';
import { DisplayDoctorDTO } from '../models/dtos/display-doctors.dto';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home-team',
  templateUrl: './home-team.component.html',
  styleUrls: ['./home-team.component.scss']
})

export class HomeTeamComponent implements OnInit  {

  doctors: DisplayDoctorDTO[] = [];

  constructor(){

  }

  ngOnInit(): void {
    this.doctors = [
      { name: 'Doctor Andreea Birlan', picturePath: (environment.doctor_images +'/Doctor-1.jpg'), doctorTitle: 'Radiolog'},
      { name: 'Doctor Alexandra Petcovici', picturePath: (environment.doctor_images +'/Doctor-2.jpg'), doctorTitle: 'Cardiolog'},
      { name: 'Doctor Leonora Borzescu', picturePath: (environment.doctor_images +'/Doctor-3.jpg'), doctorTitle: 'Cardiolog'},
      { name: 'Doctor Cabral Ibacko', picturePath: (environment.doctor_images +'/Doctor-4.jpg'), doctorTitle: 'ORL'},
      { name: 'Doctor Roberta Macovei', picturePath: (environment.doctor_images +'/Doctor-5.jpg'), doctorTitle: 'Dermatolog'}
    ]
  }
  
}
