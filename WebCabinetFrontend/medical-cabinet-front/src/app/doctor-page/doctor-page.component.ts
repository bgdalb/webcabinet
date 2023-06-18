import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.scss']
})
export class DoctorPageComponent {

  showPatientView: boolean = true;

  toggleView(showPatientView: boolean) {
    this.showPatientView = showPatientView;
  }
}
