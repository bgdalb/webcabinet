import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomMessages } from 'src/utilities/custom_messages';

@Component({
  selector: 'app-admin-page-adddoctor',
  templateUrl: './admin-page-adddoctor.component.html',
  styleUrls: ['./admin-page-adddoctor.component.scss']
})
export class AdminPageAdddoctorComponent {

  constructor(private router: Router)
  {

    
  }



  nameOfTheSite = CustomMessages.nameOfTheSite;
  
  goBackToAdminPanel(){
    this.router.navigate(['/admin-page']);
  }
}
