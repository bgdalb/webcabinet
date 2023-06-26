import { Component, EventEmitter, Output } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { CustomMessages } from 'src/utilities/custom_messages';
import { SharedDeviceService } from '../shared-device.service';
import { firstValueFrom } from 'rxjs';
import { PatientService } from '../patient-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-page-navigationbar',
  templateUrl: './user-page-navigationbar.component.html',
  styleUrls: ['./user-page-navigationbar.component.scss']
})
export class UserPageNavigationbarComponent {

  @Output() viewChanged: EventEmitter<any> = new EventEmitter<{ showMedicalHistoryForm : boolean }>();


  patient:any;
  picturePath: any;
  constructor(private scrollService: ScrollService, private sharedDeviceService: SharedDeviceService, private patientService: PatientService) {
    

  }
  
  switchToAppointmentForm() {
    this.viewChanged.emit({ showMedicalHistoryForm: false });
  }
  
  switchToMedicalHistory() {
    this.viewChanged.emit({ showMedicalHistoryForm: true });
  }



  async ngOnInit(){

    const user = this.sharedDeviceService.getUser();
    
    this.patient = await firstValueFrom(this.patientService.getPatientByUserID(user.userId));
    const filePath = this.patient.picturePath;

    const startIndex = filePath.lastIndexOf("\\Users\\");
    const extractedPath = filePath.substring(startIndex);
    const correctedPath = extractedPath.replace(/\\/g, "/");
    console.log(environment.user_files+correctedPath);
    this.picturePath =environment.user_files+correctedPath;

  }


  
  scrollToSection(section: string) {
    this.scrollService.scrollToSection(section);
  }

  nameOfTheSite = CustomMessages.nameOfTheSite;
}
