import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientService } from '../patient-service.service';
import { UserServiceService } from '../user-service.service';
import { CustomMessages } from 'src/utilities/custom_messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-page-editpatient',
  templateUrl: './admin-page-editpatient.component.html',
  styleUrls: ['./admin-page-editpatient.component.scss']
})
export class AdminPageEditpatientComponent {
  
  editPatientForm!: FormGroup;
  showEmailError: boolean = false;
  showCNPError: boolean = false;
  uniqueEmail: boolean = false;
  uniqueCNP: boolean = false;
  showSuccessMessage: boolean = false;
  showGenericError: boolean = false;

  constructor(private route: ActivatedRoute,
     private router: Router,
      private patientService: PatientService,
       private userService: UserServiceService,
       private formBuilder: FormBuilder
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
      this.buildForm();
    });
    
  }

  buildForm(): void {

    this.editPatientForm = this.formBuilder.group({
      userId: [{ value: this.selectedPatient?.userId || '', disabled: true }],
      patientId: [{ value: this.selectedPatient?.patientId || '', disabled: true }],
      name: [this.selectedPatient?.name || '', Validators.required],
      familyName: [this.selectedPatient?.familyName || '', Validators.required],
      dateOfBirth: [this.selectedPatient?.dateOfBirth ? new Date(this.selectedPatient.dateOfBirth).toISOString().substring(0, 10) : '', Validators.required, ],
      telephone: [this.selectedPatient?.telephone  || '', [Validators.required,  Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^07[0-9]{8}$')]],
      email: [this.selectedPatient?.email || '', [Validators.required, Validators.email]],
      cnp: [this.selectedPatient?.cnp || '', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
      password: ['', [Validators.minLength(6)]],
      profilePicture: [''],
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
    if (this.editPatientForm.valid){
    console.log(this.editPatientForm.value);
    }
  }

  async onSubmit() {
    if (this.editPatientForm.valid) {
      const formData = this.editPatientForm.value;
      const profilePictureInput = document.getElementById('fileUpload') as HTMLInputElement;
      const profilePictureFile = profilePictureInput?.files?.[0];

      
  
      // Reset error flags
      this.showEmailError = false;
      this.showCNPError = false;
  
      try {
        // Perform email and CNP validation checks
        const emailExists = await firstValueFrom(this.userService.checkEmailExists(formData.email));
        this.showEmailError = emailExists || false;
        this.uniqueEmail = !emailExists;
  
        const cnpExists = await firstValueFrom(this.patientService.checkCNPExists(formData.cnp));
        this.showCNPError = cnpExists || false;
        this.uniqueCNP = !cnpExists;

        if (formData.email === this.selectedPatient.email) {
          this.uniqueEmail = true;
          this.showEmailError = false;
        }
        
        if (formData.cnp === this.selectedPatient.cnp) {
          this.uniqueCNP = true;
          this.showCNPError = false;
        }
  
        if (this.uniqueEmail && this.uniqueCNP) {
          // Prepare form data for submission
          const formDataSend = new FormData();
          formDataSend.append('userId', this.selectedPatient?.userId)
          formDataSend.append('patientId', this.selectedPatient?.patientId)
          formDataSend.append('email', formData.email);
        if (formData.password){
          formDataSend.append('password', formData.password);
        }
          formDataSend.append('familyName', formData.familyName);
          formDataSend.append('name', formData.name);
          formDataSend.append('telephone', formData.telephone);
          formDataSend.append('cnp', formData.cnp);
          formDataSend.append('dateOfBirth', formData.dateOfBirth);
          
          if (profilePictureFile) {
            formDataSend.append('profilePicture', profilePictureFile);
          }
          console.log('Form Data:');
          formDataSend.forEach((value, key) => {
            console.log(key, value);
          });
          
           try {
             // Submit the form data
             this.patientService.updatePatient(formDataSend).subscribe(
               (response) => {
                 console.log('Update successful:', response);
                // Perform further actions if needed
                 //this.editPatientForm.reset();
                 this.showGenericError = false;
                 this.showSuccessMessage = true;
              },
               (error) => {
                 console.log('Error during update:', error);
                 this.showGenericError = true;
               }
             );
           } catch (error) {
            console.log('Error during update:', error);
             this.showGenericError = true;
           }
           } else {
          console.log('Cannot update user due to duplicate email or CNP');
        }
      } catch (error) {
        console.log('Error:', error);
        this.showGenericError = true;
      }
    } else {
      // Form is invalid, track validation failures
      for (const controlName in this.editPatientForm.controls) {
        if (this.editPatientForm.controls.hasOwnProperty(controlName)) {
          const control = this.editPatientForm.get(controlName);
          if (control?.invalid) {
            console.log(`Validation failed for control: ${controlName}`);
          }
        }
      }
  
      this.showGenericError = true;
      console.log('Invalid format');
    }
  
  }



  nameOfTheSite = CustomMessages.nameOfTheSite;
  goBackToAdminPanel(){
     this.router.navigate(['/admin-page']);
   }

   onFileSelected(event: any) {
    const file = event.target.files[0];
    this.editPatientForm.get('profilePicture')?.setValue(file);
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
