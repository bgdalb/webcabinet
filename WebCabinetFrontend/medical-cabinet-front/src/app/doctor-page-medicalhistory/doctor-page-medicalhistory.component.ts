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







