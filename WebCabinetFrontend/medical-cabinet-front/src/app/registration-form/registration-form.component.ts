import { Component } from '@angular/core';
import { AddPatientDTO } from '../models/dtos/add-patient.dto';
import { Patient } from '../models/entities/patient';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { response } from 'express';
import { PatientService } from '../patient-service.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  showGenericError = false;
  showEmailError = false;
  showCNPError = false;
  uniqueEmail = false;
  uniqueCNP = false;



  patient: any = {};


  constructor(private fb: FormBuilder, private userService: UserServiceService, private patientService: PatientService, private router: Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ], //add custom validator to check if the user already exists
      password: ['', [Validators.required, Validators.minLength(6)]],
      familyName: ['', Validators.required],
      firstName: ['', Validators.required],
      cnp: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^07[0-9]{8}$')]],
      dateOfBirth: ['', [Validators.required, this.minimumAgeValidator(18)]],
      profilePicture: ['', [Validators.required]],
    });
  }
  


  minimumAgeValidator(minimumAge: number) {
    return (control: any) => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      const timeDiff = currentDate.getTime() - selectedDate.getTime();
      const age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

      return age >= minimumAge ? null : { ageBelowMinimum: true };
    };
  }

  dateOfBirthValidator(minimumAge: number): any {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const currentDate = new Date();
      const dateOfBirth = new Date(control.value);

      const yearsDiff = currentDate.getFullYear() - dateOfBirth.getFullYear();
      const monthsDiff = currentDate.getMonth() - dateOfBirth.getMonth();
      const daysDiff = currentDate.getDate() - dateOfBirth.getDate();

      const age = (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) ? yearsDiff - 1 : yearsDiff;

      return age >= minimumAge ? null : { ageBelowMinimum: true };
    };
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ageValidator(minimumAge: number): any {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const dateOfBirth = new Date(control.value);
      const today = new Date();
      const diff = today.getTime() - dateOfBirth.getTime();
      const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

      return age >= minimumAge ? null : { ageBelowMinimum: true };
    };
  }




  async onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      const email = formData.email;
      const cnp = formData.cnp;
      const profilePicture = formData.profilePicture;
  
      this.showEmailError = false;
      this.showCNPError = false;
  
      try {
        const emailExists = await firstValueFrom(this.userService.checkEmailExists(email));
        this.showEmailError = emailExists || false;
        //console.log('Does EMAIL already exist? ' + emailExists);
        this.uniqueEmail = !emailExists;
  
        const cnpExists = await firstValueFrom(this.patientService.checkCNPExists(cnp));
        this.showCNPError = cnpExists || false;
        //console.log('Does CNP already exist? ' + cnpExists);
        this.uniqueCNP = !cnpExists;
  
       // console.log(this.uniqueCNP);
       // console.log(this.uniqueEmail);
  
        if (this.uniqueEmail && this.uniqueCNP) {
         // console.log('Registering user...');
  
          const formDataSend = new FormData();
          formDataSend.append('email', formData.email);
          formDataSend.append('password', formData.password);
          formDataSend.append('familyName', formData.familyName);
          formDataSend.append('firstName', formData.firstName);
          formDataSend.append('phoneNumber', formData.phoneNumber);
          formDataSend.append('cnp', formData.cnp);
          formDataSend.append('dateOfBirth', formData.dateOfBirth);
          //const profilePictureFile = this.registrationForm.get('profilePicture')?.value as File;
          //formDataSend.append('profilePicture', profilePictureFile);
          
          const profilePictureInput = document.getElementById('profile_picture') as HTMLInputElement;
          const profilePictureFile = profilePictureInput?.files?.[0];
          if (profilePictureFile) {
            formDataSend.append('profilePicture', profilePictureFile);
          }
         // console.log(profilePictureFile);
          
  
          try {
            this.userService.registerUser(formDataSend).subscribe(
              (response) => {
                console.log('Registration successful:', response);
                // Perform further actions if needed
                this.registrationForm.reset();
                this.showGenericError = false;
                this.router.navigate(['/registration-success']);
              },
              (error) => {
                console.log('Error during registration:', error);
                this.showGenericError = true;
              }
            );
          } catch (error) {
           // console.log('Error during registration:', error);
            this.showGenericError = true;
          }
        } else {
         // console.log('Cannot register user due to duplicate email or CNP');
        }
      } catch (error) {
       // console.log('Error:', error);
        this.showGenericError = true;
      }
    } else {
      this.showGenericError = true;
    }
  }
  
  

  
  
  

}
