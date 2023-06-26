import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientService } from '../patient-service.service';
import { UserServiceService } from '../user-service.service';
import { CustomMessages } from 'src/utilities/custom_messages';


@Component({
  selector: 'app-admin-page-editpatient',
  templateUrl: './admin-page-editpatient.component.html',
  styleUrls: ['./admin-page-editpatient.component.scss']
})
export class AdminPageEditpatientComponent {
  
  

  constructor(private route: ActivatedRoute,
     private router: Router,
      private patientService: PatientService,
       private userService: UserServiceService,
       ) {

       
        
       }
  selectedPatient?: any | null = null;

  ngOnInit() {
    this.route.params.subscribe(async params => {
      const patientId = +params['id']; // Get the patient ID from the route parameter
      this.patients = await firstValueFrom(this.patientService.getAllPatients());
      console.log('Edit page:')
      console.log(this.patients)
      for (const patient of this.patients) {
        const filePath = patient.picturePath;
        patient.picturePath = this.fixPicturePath(filePath);
        const patientUserData = await firstValueFrom(this.userService.getUserEmailAndIdByPatientId(patient.patientId));
        patient.userId = patientUserData.userId;
        patient.email = patientUserData.email;
        console.log(patient);
      }
      // Fetch the selected patient from your data source
      this.selectedPatient = this.patients.find(patient => patient.patientId === patientId) || null;
    });
  }

  patients: any[] = [
  ];
  
  fixPicturePath(initialPath: string): string {
    const filePath = initialPath;
  
    const startIndex = filePath.lastIndexOf("\\Users\\");
    const extractedPath = filePath.substring(startIndex);
    const correctedPath = extractedPath.replace(/\\/g, "/");
    const picturePath = environment.user_files + correctedPath;
  
    console.log(picturePath);
  
    return picturePath;
  }

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



  nameOfTheSite = CustomMessages.nameOfTheSite;
  goBackToAdminPanel(){
     this.router.navigate(['/admin-page']);
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
