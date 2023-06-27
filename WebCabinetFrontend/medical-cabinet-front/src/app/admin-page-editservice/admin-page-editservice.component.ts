import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { UserServiceService } from '../user-service.service';
import { FormBuilder } from '@angular/forms';
import { ServicesService } from '../services.service';
import { CustomMessages } from 'src/utilities/custom_messages';

@Component({
  selector: 'app-admin-page-editservice',
  templateUrl: './admin-page-editservice.component.html',
  styleUrls: ['./admin-page-editservice.component.scss']
})
export class AdminPageEditserviceComponent {
  
  constructor(private route: ActivatedRoute,
    private router: Router,
     private doctorService: DoctorService,
      private userService: UserServiceService,
      private formBuilder: FormBuilder,
      private serviceService: ServicesService
      ) {

      
       
      }


  nameOfTheSite = CustomMessages.nameOfTheSite;
  goBackToAdminPanel(){
     this.router.navigate(['/admin-page']);
   }

   onFileSelected(event: any) {
    const file = event.target.files[0];
    //this.editService.get('profilePicture')?.setValue(file);
  }
}
