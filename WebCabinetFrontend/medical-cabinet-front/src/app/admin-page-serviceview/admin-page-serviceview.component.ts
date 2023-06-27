import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedDeviceService } from '../shared-device.service';
import { DoctorService } from '../doctor.service';
import { UserServiceService } from '../user-service.service';
import { ServicesService } from '../services.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-page-serviceview',
  templateUrl: './admin-page-serviceview.component.html',
  styleUrls: ['./admin-page-serviceview.component.scss']
})
export class AdminPageServiceviewComponent {


  constructor(private router: Router,
      private sharedDeviceService: SharedDeviceService,
        private doctorService: DoctorService,
         private userService: UserServiceService,
          private serviceService : ServicesService) {}


  filteredServices: any[] | null = null;
  services: any[] = [
    
  ];

  async ngOnInit() {
    const user = this.sharedDeviceService.getUser();
  
    this.services = await firstValueFrom(this.serviceService.getAllServices());
    console.log(this.services);
    
    // Fetch all doctors
    const doctors = await firstValueFrom(this.doctorService.getAllDoctors());
  
    for (const service of this.services) {
      const filePath = service.picturePath;
      service.picturePath = this.fixPicturePath(filePath);
      
      // Find the matching doctor using doctorId
      const doctor = doctors.find(doctor => doctor.doctorId === service.doctorId);
  
      if (doctor) {
        service.doctorName = doctor.familyName + ' ' + doctor.name; // Assign the doctor's name to the service
      }
  
      console.log(service);
    }
  }


  fixPicturePath(initialPath: string): string {
    const filePath = initialPath;
  
    const startIndex = filePath.lastIndexOf("\\Services");
    const extractedPath = filePath.substring(startIndex);
    const correctedPath = extractedPath.replace(/\\/g, "/");
    const picturePath = environment.user_files + correctedPath;
  
      // Append cache-busting query parameter
    const cacheBuster = Date.now().toString();
    const updatedPicturePath = picturePath + `?v=${cacheBuster}`;

    console.log(picturePath);
  
    return picturePath;
  }


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


  addService(){
    this.router.navigate(['/add-service'])
  }
  
  editService(service: any) {
    // Implement logic to navigate to the edit page for the selected patient
    console.log('Editing service:', service);
    this.router.navigate(['/edit-service', service.serviceId]);
    
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


