import { Component } from '@angular/core';
import { DisplayDoctorDTO } from '../models/dtos/display-doctors.dto';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home-team',
  templateUrl: './home-team.component.html',
  styleUrls: ['./home-team.component.scss']
})

export class HomeTeamComponent {

  doctors: DisplayDoctorDTO[] = [];

  constructor(){
    this.doctors = [
      { name: 'Doctor Alban', picturePath: (environment.doctor_images +'/doctor-1.jpg'), doctorTitle: 'BossDoctor'},
      { name: 'Doctor Bentea', picturePath: (environment.doctor_images +'/doctor-2.jpg'), doctorTitle: 'SmecherDoctor'},
      { name: 'Doctor Alta', picturePath: (environment.doctor_images +'/doctor-3.jpg'), doctorTitle: 'SpermDOnor'}
    ]
  }
  
}
