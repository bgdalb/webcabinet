import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { CustomMessages } from 'src/utilities/custom_messages';
import { SharedDeviceService } from '../shared-device.service';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-page-navigationbar',
  templateUrl: './doctor-page-navigationbar.component.html',
  styleUrls: ['./doctor-page-navigationbar.component.scss']
})
export class DoctorPageNavigationbarComponent {

  doctor: any;
  picturePath: any;
  @Input() showPatientView: boolean = true;
  @Output() toggleView: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private scrollService: ScrollService, private sharedDeviceService: SharedDeviceService, private doctorService: DoctorService) {}

  scrollToSection(section: string) {
    this.scrollService.scrollToSection(section);
  }


  async ngOnInit(){

    const user = this.sharedDeviceService.getUser();
    
    this.doctor = await firstValueFrom(this.doctorService.getDoctorByUserID(user.userId));
    console.log(this.doctor)
    const filePath = this.doctor.picturePath;

    const startIndex = filePath.lastIndexOf("\\Users\\");
    const extractedPath = filePath.substring(startIndex);
    const correctedPath = extractedPath.replace(/\\/g, "/");
    console.log(environment.user_files+correctedPath);
    this.picturePath =environment.user_files+correctedPath;

  }

  nameOfTheSite = CustomMessages.nameOfTheSite;
}
