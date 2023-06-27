import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomMessages } from 'src/utilities/custom_messages';
import { DoctorService } from '../doctor.service';
import { UserServiceService } from '../user-service.service';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-page-addservice',
  templateUrl: './admin-page-addservice.component.html',
  styleUrls: ['./admin-page-addservice.component.scss']
})
export class AdminPageAddserviceComponent {

  hours : number[] = [1,2,3,4,5,6];
  doctors : any[] = []
  constructor(private router: Router,
     private formBuilder: FormBuilder,
      private doctorService: DoctorService,
       private userService : UserServiceService,
        private serviceService: ServicesService)
  {

  }

  showSuccessMessage: boolean = false;
  showGenericError: boolean = false;
  serviceForm!: FormGroup;

  async ngOnInit() {
    this.doctors = await firstValueFrom(this.doctorService.getAllDoctors());
    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      duration: ['', [Validators.required]],
      profilePicture: ['', Validators.required],
      doctorId: ['', Validators.required]
    });


  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.serviceForm.get('profilePicture')?.setValue(file);
  }


  async onSubmit() {
    if (this.serviceForm.valid) {
      const formData = this.serviceForm.value;
      const profilePictureInput = document.getElementById('fileUpload') as HTMLInputElement;
      const profilePictureFile = profilePictureInput?.files?.[0];

  
      try {
       
          const formDataSend = new FormData();
          formDataSend.append('ServiceName', formData.name);
          const formatTime = '0'+formData.duration+':00:00.0000000';
          formDataSend.append('EstimatedDuration', formatTime);
          formDataSend.append('DoctorId', formData.doctorId);

          
          if (profilePictureFile) {
            formDataSend.append('Picture', profilePictureFile);
          }
          console.log('Form Data:');
          formDataSend.forEach((value, key) => {
            console.log(key, value);
          });
          try {
            // Submit the form data
            this.serviceService.addService(formDataSend).subscribe(
              (response) => {
                console.log('Registration successful:', response);
                // Perform further actions if needed
                this.serviceForm.reset();
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
        
        
      } catch (error) {
        console.log('Error:', error);
        this.showGenericError = true;
      }
    } else {
      // Form is invalid, track validation failures
      for (const controlName in this.serviceForm.controls) {
        if (this.serviceForm.controls.hasOwnProperty(controlName)) {
          const control = this.serviceForm.get(controlName);
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
}
