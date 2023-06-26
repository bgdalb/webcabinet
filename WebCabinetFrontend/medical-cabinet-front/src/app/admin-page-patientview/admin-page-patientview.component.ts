import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedDeviceService } from '../shared-device.service';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient-service.service';
import { firstValueFrom } from 'rxjs';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-admin-page-patientview',
  templateUrl: './admin-page-patientview.component.html',
  styleUrls: ['./admin-page-patientview.component.scss']
})
export class AdminPagePatientviewComponent {

  constructor(private router: Router, private sharedDeviceService: SharedDeviceService,  private patientService: PatientService, private userService: UserServiceService) {}

  filteredPatients: any[] | null = null;
  patients: any[] = [
  ];

  async ngOnInit(){

    const user = this.sharedDeviceService.getUser();
    
    
    this.patients = await firstValueFrom(this.patientService.getAllPatients());
    console.log(this.patients)
    for (const patient of this.patients) {
      const filePath = patient.picturePath;
      patient.picturePath = this.fixPicturePath(filePath);
      const patientUserData = await firstValueFrom(this.userService.getUserEmailAndIdByPatientId(patient.patientId));
      patient.userId = patientUserData.userId;
      patient.email = patientUserData.email;
      console.log(patient);
    }


  }

  fixPicturePath(initialPath: string): string {
    const filePath = initialPath;
  
    const startIndex = filePath.lastIndexOf("\\Users\\");
    const extractedPath = filePath.substring(startIndex);
    const correctedPath = extractedPath.replace(/\\/g, "/");
    const picturePath = environment.user_files + correctedPath;
  
    console.log(picturePath);
  
    return picturePath;
  }


  filterPatients(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm) {
      this.filteredPatients = this.patients.filter(patient =>
        (patient.name.toLowerCase() + ' ' + patient.familyName.toLowerCase()).includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredPatients = null;
    }
  }


  addPatient(){
    this.router.navigate(['/add-patient'])
  }

  editPatient(userPatient: any): void {
    // Redirect to the edit page with patient ID
    
    this.router.navigate(['/edit-patient', userPatient.patientId]);
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
