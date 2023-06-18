import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-page-doctorview',
  templateUrl: './admin-page-doctorview.component.html',
  styleUrls: ['./admin-page-doctorview.component.scss']
})
export class AdminPageDoctorviewComponent {
  

  constructor(private router: Router) {}

  filteredDoctors: Doctor[] | null = null;
  doctors: Doctor[] = [
    {
      id: 1,
      photo: (environment.doctor_images +'/doctor-1.jpg'),
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
    },
    {
      id: 2,
      photo: (environment.doctor_images +'/doctor-2.jpg'),
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '0987654321',
    },
    {
      id: 3,
      photo: (environment.doctor_images +'/doctor-3.jpg'),
      name: 'Alice',
      surname: 'Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '9876543210',
    },

    {
      id: 4,
      photo: (environment.doctor_images +'/doctor-3.jpg'),
      name: 'Alice',
      surname: 'Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '9876543210',
    },

    // Add more patients here...
  ];



  filterDoctors(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm) {
      this.filteredDoctors = this.doctors.filter(doctor =>
        (doctor.name.toLowerCase() + ' ' + doctor.surname.toLowerCase()).includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredDoctors = null;
    }
  }



  editDoctor(doctor: Doctor) {
    // Implement logic to navigate to the edit page for the selected patient
    console.log('Editing doctor:', doctor);
  }

  updateDoctor(doctor: Doctor) {
    // Implement logic to update the patient's information in the database
    console.log('Updating doctor:', doctor);
  }

  deleteDoctor(doctor: Doctor) {
    // Implement logic to delete the patient from the database
    console.log('Deleting doctor:', doctor);
  }
}





interface Doctor {
  id: number;
  photo: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;

}

