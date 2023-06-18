import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-doctor-page-patientview',
  templateUrl: './doctor-page-patientview.component.html',
  styleUrls: ['./doctor-page-patientview.component.scss']
})
export class DoctorPagePatientviewComponent {

  constructor(private router: Router) {}

  filteredPatients: Patient[] | null = null;
  patients: Patient[] = [
    {
      id: 1,
      photo: (environment.patient_images +'/patient-1.jpg'),
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      cnp: '1234567890',
      medicalHistory: ['file1.pdf', 'file2.pdf', 'file3.pdf']
    },
    {
      id: 2,
      photo: (environment.patient_images +'/patient-2.jpg'),
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '0987654321',
      cnp: '0987654321',
      medicalHistory: ['file4.pdf', 'file5.pdf']
    },
    {
      id: 3,
      photo: (environment.patient_images +'/patient-3.jpg'),
      name: 'Alice',
      surname: 'Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '9876543210',
      cnp: '9876543210',
      medicalHistory: ['file6.pdf']
    },

    {
      id: 4,
      photo: (environment.patient_images +'/patient-3.jpg'),
      name: 'Alice',
      surname: 'Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '9876543210',
      cnp: '9876543210',
      medicalHistory: ['file6.pdf']
    },

    {
      id: 3,
      photo: (environment.patient_images +'/patient-3.jpg'),
      name: 'Alice',
      surname: 'Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '9876543210',
      cnp: '9876543210',
      medicalHistory: ['file6.pdf']
    },
    // Add more patients here...
  ];



  filterPatients(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm) {
      this.filteredPatients = this.patients.filter(patient =>
        (patient.name.toLowerCase() + ' ' + patient.surname.toLowerCase()).includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredPatients = null;
    }
  }

  viewMedicalHistory(patient: Patient) {
    // Navigate to the medical history page with the patient's ID as a route parameter
    this.router.navigate(['/medical-history', patient.id]);
  }
}





interface Patient {
  id: number;
  photo: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  cnp: string;
  medicalHistory: string[];
}
