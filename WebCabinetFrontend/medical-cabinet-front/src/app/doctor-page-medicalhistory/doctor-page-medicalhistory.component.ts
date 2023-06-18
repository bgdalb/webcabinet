import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctor-page-medicalhistory',
  templateUrl: './doctor-page-medicalhistory.component.html',
  styleUrls: ['./doctor-page-medicalhistory.component.scss']
})
export class DoctorPageMedicalhistoryComponent {

  constructor(private route: ActivatedRoute) {}
  selectedPatient: Patient | null = null;
  newFile: string = '';
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
    }]

  ngOnInit() {
    this.route.params.subscribe(params => {
      const patientId = +params['id']; // Get the patient ID from the route parameter

      // Fetch the selected patient from your data source
      this.selectedPatient = this.patients.find(patient => patient.id === patientId) || null;
    });
  }

  // Function to set the selected patient
  selectPatient(patient: Patient) {
    this.selectedPatient = patient;
  }

  refreshNewFile(event: Event){
    const searchTerm = (event.target as HTMLInputElement).value;
    this.newFile = searchTerm;
  }
  addNewFile() {
    // Add the new file to the selected patient's medical history
    if (this.selectedPatient) {
      this.selectedPatient.medicalHistory.push(this.newFile);
      this.newFile = ''; // Clear the input field
    }
  }


  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.newFile = files[0].toString();
    }
  }

  viewFile(file: string) {
    console.log('Viewing file:', file);
    // Implement logic to open/view the file
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







