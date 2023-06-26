import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { PatientService } from '../patient-service.service';
import { UserServiceService } from '../user-service.service';
import { environment } from 'src/environments/environment';
import { CustomMessages } from 'src/utilities/custom_messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page-addpatient',
  templateUrl: './admin-page-addpatient.component.html',
  styleUrls: ['./admin-page-addpatient.component.scss']
})
export class AdminPageAddpatientComponent implements OnInit {

  patientForm!: FormGroup;
  showEmailError: boolean = false;
  showCNPError: boolean = false;
  uniqueEmail: boolean = false;
  uniqueCNP: boolean = false;
  showSuccessMessage: boolean = false;
  showGenericError: boolean = false;


  constructor(private router: Router, private formBuilder: FormBuilder, private patientService: PatientService, private userService : UserServiceService){}


  ngOnInit() {
    this.patientForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      familyName: ['', Validators.required],
      firstName: ['', Validators.required],
      cnp: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^07[0-9]{8}$')]],
      dateOfBirth: ['', [Validators.required, this.minimumAgeValidator(18)]],
      profilePicture: ['', Validators.required],
    });
  }

  minimumAgeValidator(minimumAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const currentDate = new Date();
        const dateOfBirth = new Date(control.value);
        const age = currentDate.getFullYear() - dateOfBirth.getFullYear();

        if (age < minimumAge) {
          return { minimumAge: true };
        }
      }

      return null;
    };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.patientForm.get('profilePicture')?.setValue(file);
  }

  nameOfTheSite = CustomMessages.nameOfTheSite;


  async onSubmit() {
    if (this.patientForm.valid) {
      const formData = this.patientForm.value;
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
  
        if (this.uniqueEmail && this.uniqueCNP) {
          // Prepare form data for submission
          const formDataSend = new FormData();
          formDataSend.append('email', formData.email);
          formDataSend.append('password', formData.password);
          formDataSend.append('familyName', formData.familyName);
          formDataSend.append('firstName', formData.firstName);
          formDataSend.append('phoneNumber', formData.phoneNumber);
          formDataSend.append('cnp', formData.cnp);
          formDataSend.append('dateOfBirth', formData.dateOfBirth);
          
          if (profilePictureFile) {
            formDataSend.append('profilePicture', profilePictureFile);
          }
          
          try {
            // Submit the form data
            this.userService.registerUser(formDataSend).subscribe(
              (response) => {
                console.log('Registration successful:', response);
                // Perform further actions if needed
                this.patientForm.reset();
                this.showGenericError = false;
                this.showSuccessMessage = true;
              },
              (error) => {
                console.log('Error during registration:', error);
                this.showGenericError = true;
              }
            );
          } catch (error) {
            console.log('Error during registration:', error);
            this.showGenericError = true;
          }
        } else {
          console.log('Cannot register user due to duplicate email or CNP');
        }
      } catch (error) {
        console.log('Error:', error);
        this.showGenericError = true;
      }
    } else {
      // Form is invalid, track validation failures
      for (const controlName in this.patientForm.controls) {
        if (this.patientForm.controls.hasOwnProperty(controlName)) {
          const control = this.patientForm.get(controlName);
          if (control?.invalid) {
            console.log(`Validation failed for control: ${controlName}`);
          }
        }
      }
  
      this.showGenericError = true;
      console.log('Invalid format');
    }
  
  }
  
  goBackToAdminPanel(){
    this.router.navigate(['/admin-page']);
  }

}
