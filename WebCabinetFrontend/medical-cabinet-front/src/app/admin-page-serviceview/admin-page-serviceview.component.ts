import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-page-serviceview',
  templateUrl: './admin-page-serviceview.component.html',
  styleUrls: ['./admin-page-serviceview.component.scss']
})
export class AdminPageServiceviewComponent {


  constructor(private router: Router) {}

  filteredServices: Service[] | null = null;
  services: Service[] = [
    {
      id: 1,
      photo: (environment.service_images +'/service-1.jpg'),
      name: 'Serviciu 1',
      description:'Descriere 1'
    },
    {
      id: 2,
      photo: (environment.service_images +'/service-2.jpg'),
      name: 'Serviciu 2',
      description:'Descriere 2'

    },
    {
      id: 3,
      photo: (environment.service_images +'/service-3.jpg'),
      name: 'Serviciu 3',
      description:'Descriere 3'
    },

    {
      id: 4,
      photo: (environment.service_images +'/service-3.jpg'),
      name: 'Serviciu 4',
      description:'Descriere 4'

    },

    // Add more services here...
  ];



  filterServices(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm) {
      this.filteredServices = this.services.filter(service =>
        (service.name.toLowerCase()).includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredServices = null;
    }
  }



  editService(service: Service) {
    // Implement logic to navigate to the edit page for the selected patient
    console.log('Editing service:', service);
  }

  updateService(service: Service) {
    // Implement logic to update the patient's information in the database
    console.log('Updating service:', service);
  }

  deleteService(service: Service) {
    // Implement logic to delete the patient from the database
    console.log('Deleting service:', service);
  }
}





interface Service {
  id: number;
  photo: string;
  name: string;
  description: string;

}


