import { Component } from '@angular/core';
import { SharedDeviceService } from '../shared-device.service';
import { PatientService } from '../patient-service.service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-page-medicalhistory',
  templateUrl: './user-page-medicalhistory.component.html',
  styleUrls: ['./user-page-medicalhistory.component.scss']
})
export class UserPageMedicalhistoryComponent {
viewFile(_t14: any) {
throw new Error('Method not implemented.');
}

  selectedPatient : any;
  picturePath : any;
  constructor(private sharedDeviceService: SharedDeviceService, private patientService: PatientService){
    
  }

  async ngOnInit(){

    const user = this.sharedDeviceService.getUser();
    
    this.selectedPatient = await firstValueFrom(this.patientService.getPatientByUserID(user.userId));
    const filePath = this.selectedPatient.picturePath;

    const startIndex = filePath.lastIndexOf("\\Users\\");
    const extractedPath = filePath.substring(startIndex);
    const correctedPath = extractedPath.replace(/\\/g, "/");
    this.picturePath =environment.user_files+correctedPath;
    

  }

}
