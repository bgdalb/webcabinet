import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomMessages } from 'src/utilities/custom_messages';
import { DoctorService } from '../doctor.service';
import { UserServiceService } from '../user-service.service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-page-editdoctor',
  templateUrl: './admin-page-editdoctor.component.html',
  styleUrls: ['./admin-page-editdoctor.component.scss']
})
export class AdminPageEditdoctorComponent {


  showEmailError: boolean = false;

  uniqueEmail: boolean = false;

  showSuccessMessage: boolean = false;
  showGenericError: boolean = false;

  constructor(private route: ActivatedRoute,
     private router: Router,
      private doctorService: DoctorService,
       private userService: UserServiceService,
       private formBuilder: FormBuilder
       ) {

       
        
       }

  selectedDoctor?: any | null = null;

  doctors: any[] = [
  ];
  ngOnInit() {
    this.route.params.subscribe(async params => {
      const doctorId = +params['id']; // Get the patient ID from the route parameter
      this.doctors = await firstValueFrom(this.doctorService.getAllDoctors());
      console.log('Edit page:')
      console.log(this.doctors)
      for (const doctor of this.doctors) {
        const filePath = doctor.picturePath;
        doctor.picturePath = this.fixPicturePath(filePath);
        const doctorUserData = await firstValueFrom(this.userService.getUserEmailAndIdByDoctorId(doctor.doctorId));
        doctor.userId = doctorUserData.userId;
        doctor.email = doctorUserData.email;
        console.log(doctor);
      }
      // Fetch the selected patient from your data source
      this.selectedDoctor = this.doctors.find(doctor => doctor.doctorId === doctorId) || null;
      this.buildForm();
    });
    
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

  editDoctorForm!: FormGroup;
  buildForm(): void {

    this.editDoctorForm = this.formBuilder.group({
      userId: [{ value: this.selectedDoctor?.userId || '', disabled: true }],
      doctorId: [{ value: this.selectedDoctor?.doctorId || '', disabled: true }],
      name: [this.selectedDoctor?.name || '', Validators.required],
      familyName: [this.selectedDoctor?.familyName || '', Validators.required],
      telephone: [this.selectedDoctor?.telephone  || '', [Validators.required,  Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^07[0-9]{8}$')]],
      email: [this.selectedDoctor?.email || '', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      profilePicture: [''],
      doctorTitle: [this.selectedDoctor?.doctorTitle || '', Validators.required],
    });

  }

  async onSubmit() {
    if (this.editDoctorForm.valid) {
      const formData = this.editDoctorForm.value;
      const profilePictureInput = document.getElementById('fileUpload') as HTMLInputElement;
      const profilePictureFile = profilePictureInput?.files?.[0];

      
  
      // Reset error flags
      this.showEmailError = false;

  
      try {
        // Perform email and CNP validation checks
        const emailExists = await firstValueFrom(this.userService.checkEmailExists(formData.email));
        this.showEmailError = emailExists || false;
        this.uniqueEmail = !emailExists;
  

        if (formData.email === this.selectedDoctor.email) {
          this.uniqueEmail = true;
          this.showEmailError = false;
        }

        if (this.uniqueEmail) {
          // Prepare form data for submission
          const formDataSend = new FormData();
          formDataSend.append('userId', this.selectedDoctor?.userId)
          formDataSend.append('doctorId', this.selectedDoctor?.doctorId)
          formDataSend.append('email', formData.email);
        if (formData.password){
          formDataSend.append('password', formData.password);
        }
          formDataSend.append('familyName', formData.familyName);
          formDataSend.append('name', formData.name);
          formDataSend.append('telephone', formData.telephone);
          formDataSend.append('doctorTitle', formData.doctorTitle);
          
          if (profilePictureFile) {
            formDataSend.append('profilePicture', profilePictureFile);
          }
                    console.log('Form Data:');
          formDataSend.forEach((value, key) => {
            console.log(key, value);
          });
          
           try {
             // Submit the form data
             this.doctorService.updateDoctor(formDataSend).subscribe(
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
                 this.showSuccessMessage = false;

               }
             );
           } catch (error) {
            console.log('Error during update:', error);
             this.showGenericError = true;
             this.showSuccessMessage = false;

           }
           } else {
          console.log('Cannot update user due to duplicate email or CNP');
          this.showSuccessMessage = false;
        }
      } catch (error) {
        console.log('Error:', error);
        this.showGenericError = true;
        this.showSuccessMessage = false;

      }
    } else {
      // Form is invalid, track validation failures
      for (const controlName in this.editDoctorForm.controls) {
        if (this.editDoctorForm.controls.hasOwnProperty(controlName)) {
          const control = this.editDoctorForm.get(controlName);
          if (control?.invalid) {
            console.log(`Validation failed for control: ${controlName}`);
          }
        }
      }
  
      this.showGenericError = true;
      this.showSuccessMessage = false;

      console.log('Invalid format');
    }
  
  }

  



  nameOfTheSite = CustomMessages.nameOfTheSite;
  goBackToAdminPanel(){
     this.router.navigate(['/admin-page']);
   }

   onFileSelected(event: any) {
    const file = event.target.files[0];
    this.editDoctorForm.get('profilePicture')?.setValue(file);
  }
}
