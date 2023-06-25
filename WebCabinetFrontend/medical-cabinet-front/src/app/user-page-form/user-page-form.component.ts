import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { DoctorService } from '../doctor.service';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-user-page-form',
  templateUrl: './user-page-form.component.html',
  styleUrls: ['./user-page-form.component.scss'],
})
export class UserPageFormComponent {

  doctors: Doctor[] = [];
  services: Service[] = [];
  
  constructor(private doctorService : DoctorService, private serviceService : ServicesService){

  }

  filteredServices: Service[] = []; // Services filtered by the selected doctor
  @ViewChild('doctorSelect') doctorSelect: any;
  @ViewChild('serviceSelect') serviceSelect: any;
  selectedDoctor!: Doctor;
  selectedService!: Service;
  formDisabled = false;

  @Output() doctorServiceSelected = new EventEmitter<{ doctor: Doctor, service: Service }>();

  
  async ngOnInit() {
    this.doctors=await firstValueFrom(this.doctorService.getAllDoctors());
    this.services=await firstValueFrom(this.serviceService.getAllServices());
    this.selectedDoctor=this.doctors[0];
    this.filteredServices = this.services.filter(service => service.doctorId === this.selectedDoctor.doctorId);
    this.selectedService=this.filteredServices[0];
    console.log(this.doctors, this.services);


  }


  onButtonClicked() {
    console.log('Doctor:', this.selectedDoctor);
    console.log('Service:', this.selectedService);
    
    this.doctorServiceSelected.emit({ doctor: this.selectedDoctor, service: this.selectedService });
  }


  disableForm() {
    this.formDisabled = true;

  }

  
  filterServices() {
    if (this.selectedDoctor) {
      // Filter services based on the selected doctor
      this.filteredServices = this.services.filter(service => service.doctorId === this.selectedDoctor.doctorId);
  
      // Check if the selected service is still valid after filtering
      const isSelectedServiceValid = this.filteredServices.some(service => service.serviceId === this.selectedService.serviceId);
      if (!isSelectedServiceValid) {
        // Update the selected service to the first service in the filtered list
        this.selectedService = this.filteredServices[0];
      }
    } else {
      // Reset filtered services if no doctor is selected
      this.filteredServices = [];
    }
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