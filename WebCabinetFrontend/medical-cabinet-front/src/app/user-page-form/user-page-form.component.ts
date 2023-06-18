import { Component, EventEmitter, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-user-page-form',
  templateUrl: './user-page-form.component.html',
  styleUrls: ['./user-page-form.component.scss'],
})
export class UserPageFormComponent {

  doctors: string[] = ['Doctor Alban', 'Doctor Bentea', 'Doctor Pulea'];
  services: string[] = ['Control', 'Ceva orl', 'Altceva'];
  @ViewChild('doctorSelect') doctorSelect: any;
  @ViewChild('serviceSelect') serviceSelect: any;
  selectedDoctor!: string;
  selectedService!: string;
  formDisabled = false;

  @Output() doctorServiceSelected = new EventEmitter<{ doctor: string, service: string }>();

  
  ngOnInit() {
      this.selectedDoctor = this.doctors[0];
      this.selectedService = this.services[0];

  }


  onButtonClicked() {
    console.log('Doctor:', this.selectedDoctor);
    console.log('Service:', this.selectedService);
    this.doctorServiceSelected.emit({ doctor: this.selectedDoctor, service: this.selectedService });
  }


  disableForm() {
    this.formDisabled = true;

  }
}
