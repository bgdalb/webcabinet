import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient-service.service';
import { Patient } from '../models/entities/patient';
import { UserServiceService } from '../user-service.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(){
  }

  ngOnInit(): void {
  }
}
