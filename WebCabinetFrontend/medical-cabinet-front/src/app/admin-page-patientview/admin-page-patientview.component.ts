import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-page-patientview',
  templateUrl: './admin-page-patientview.component.html',
  styleUrls: ['./admin-page-patientview.component.scss']
})
export class AdminPagePatientviewComponent {

  constructor(private router: Router) {}

  filteredPatients: Patient[] | null = null;
  patients: Patient[] = [
    {
      id: 1,
      photo: (environment.patient_images +'/patient-1.jpg'),
      name: 'Robert',
      surname: 'Andrei',
      email: 'robert.andrei@gmail.com',
      phoneNumber: '0784754321',
      cnp: '1950403394321',
      medicalHistory: ['Control_ORL_24-04-14.pdf', 'Control_ORL_24-04-12.pdf', 'Control_ORL_24-04-17.pdf']
    },
    {
      id: 2,
      photo: (environment.patient_images +'/patient-2.jpg'),
      name: 'Cristea',
      surname: 'Adrian',
      email: 'crsadrian@gmail.com',
      phoneNumber: '0784432412',
      cnp: '1950204394124',
      medicalHistory: ['Control_Dermatologic_26-07-15.pdf', 'Control_Dermatologic_26-01-22.pdf']
    },
    {
      id: 3,
      photo: (environment.patient_images +'/patient-3.jpg'),
      name: 'Adelin',
      surname: 'Vrabie',
      email: 'vradelin@yahoo.com',
      phoneNumber: '0784232459',
      cnp: '1910204344124',
      medicalHistory: ['Control_Dermatologic_11-03-2023.pdf']
    },

    {
      id: 4,
      photo: (environment.patient_images +'/patient-4.jpg'),
      name: 'Roberta',
      surname: 'Alexandre',
      email: 'rob.alex@unitbv.ro',
      phoneNumber: '0784332314',
      cnp: '2910204354714',
      medicalHistory: []
    },

    {
      id: 5,
      photo: (environment.patient_images +'/patient-5.jpg'),
      name: 'Eureka',
      surname: 'Valeha',
      email: 'evval@gmail.com',
      phoneNumber: '0794143121',
      cnp: '2970122414514',
      medicalHistory: []
    },
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

  editPatient(patient: Patient): void {
    // Redirect to the edit page with patient ID
    this.router.navigate(['/edit-patient', patient.id]);
  }

  updatePatient(patient: Patient) {
    // Implement logic to update the patient's information in the database
    console.log('Updating patient:', patient);
  }

  deletePatient(patient: Patient) {
    // Implement logic to delete the patient from the database
    console.log('Deleting patient:', patient);
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
