import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomMessages } from 'src/utilities/custom_messages';
import { UserServiceService } from '../user-service.service';
import { DoctorService } from '../doctor.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-page-adddoctor',
  templateUrl: './admin-page-adddoctor.component.html',
  styleUrls: ['./admin-page-adddoctor.component.scss']
})
export class AdminPageAdddoctorComponent {

  constructor(private router: Router, private formBuilder: FormBuilder, private doctorService: DoctorService, private userService : UserServiceService)
  {

  }

  doctorForm!: FormGroup;
  showEmailError: boolean = false;
  uniqueEmail: boolean = false;
  showSuccessMessage: boolean = false;
  showGenericError: boolean = false;
  ngOnInit() {
    this.doctorForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      familyName: ['', Validators.required],
      firstName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^07[0-9]{8}$')]],
      profilePicture: ['', Validators.required],
      doctorTitle: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.doctorForm.valid) {
      const formData = this.doctorForm.value;
      const profilePictureInput = document.getElementById('fileUpload') as HTMLInputElement;
      const profilePictureFile = profilePictureInput?.files?.[0];
  
      // Reset error flags
      this.showEmailError = false;
  
      try {
        // Perform email and CNP validation checks
        const emailExists = await firstValueFrom(this.userService.checkEmailExists(formData.email));
        this.showEmailError = emailExists || false;
        this.uniqueEmail = !emailExists;
  

        if (this.uniqueEmail) {
          // Prepare form data for submission
          const formDataSend = new FormData();
          formDataSend.append('email', formData.email);
          formDataSend.append('password', formData.password);
          formDataSend.append('familyName', formData.familyName);
          formDataSend.append('firstName', formData.firstName);
          formDataSend.append('phoneNumber', formData.phoneNumber);
          formDataSend.append('doctorTitle', formData.doctorTitle);
          
          if (profilePictureFile) {
            formDataSend.append('profilePicture', profilePictureFile);
          }
          
          try {
            // Submit the form data
            this.userService.registerDoctor(formDataSend).subscribe(
              (response) => {
                console.log('Registration successful:', response);
                // Perform further actions if needed
                this.doctorForm.reset();
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
          console.log('Cannot register doctor due to duplicate email');
        }
      } catch (error) {
        console.log('Error:', error);
        this.showGenericError = true;
      }
    } else {
      // Form is invalid, track validation failures
      for (const controlName in this.doctorForm.controls) {
        if (this.doctorForm.controls.hasOwnProperty(controlName)) {
          const control = this.doctorForm.get(controlName);
          if (control?.invalid) {
            console.log(`Validation failed for control: ${controlName}`);
          }
        }
      }
  
      this.showGenericError = true;
      console.log('Invalid format');
    }
  
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.doctorForm.get('profilePicture')?.setValue(file);
  }

  
  nameOfTheSite = CustomMessages.nameOfTheSite;
  
  goBackToAdminPanel(){
    this.router.navigate(['/admin-page']);
  }
}
