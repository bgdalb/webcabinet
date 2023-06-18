import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-page-editpatient',
  templateUrl: './admin-page-editpatient.component.html',
  styleUrls: ['./admin-page-editpatient.component.scss']
})
export class AdminPageEditpatientComponent {

  constructor(private route: ActivatedRoute) {}
  selectedPatient?: Patient | null = null;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const patientId = +params['id']; // Get the patient ID from the route parameter

      // Fetch the selected patient from your data source
      this.selectedPatient = this.patients.find(patient => patient.id === patientId) || null;
    });
  }

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
  
  onNameChange(event: Event) {
    const name = (event.target as HTMLInputElement).value;
    
  }

  onSurnameChange(event: Event) {
    const surname = (event.target as HTMLInputElement).value;
  }

  onPhoneNumberChange(event: Event) {
    const phoneNumber = (event.target as HTMLInputElement).value;
  }

  onEmailChange(event: Event) {
    const email = (event.target as HTMLInputElement).value;
  }

  onCnpChange(event: Event) {
    const cnp = (event.target as HTMLInputElement).value;
  }

  saveChanges() {
    // Perform the necessary logic to save the changes
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
