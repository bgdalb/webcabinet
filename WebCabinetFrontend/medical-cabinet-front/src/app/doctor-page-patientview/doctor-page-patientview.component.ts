import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedDeviceService } from '../shared-device.service';
import { DoctorService } from '../doctor.service';
import { firstValueFrom } from 'rxjs';
import { PatientService } from '../patient-service.service';
@Component({
  selector: 'app-doctor-page-patientview',
  templateUrl: './doctor-page-patientview.component.html',
  styleUrls: ['./doctor-page-patientview.component.scss']
})
export class DoctorPagePatientviewComponent {

  constructor(private router: Router, private sharedDeviceService: SharedDeviceService, private doctorService: DoctorService, private patientService: PatientService) {}

  doctor : any;
  picturePath : any;
  filteredPatients: any[] | null = null;
  patients: any[] = [  
  ];

  async ngOnInit(){

    const user = this.sharedDeviceService.getUser();
    
    this.doctor = await firstValueFrom(this.doctorService.getDoctorByUserID(user.userId));
    this.patients = await firstValueFrom(this.patientService.getAllPatients());
    console.log(this.patients)
    console.log(this.doctor)
    for (const patient of this.patients) {
      const filePath = patient.picturePath;
      patient.picturePath = this.fixPicturePath(filePath);
    }
    const filePath = this.doctor.picturePath;
    this.picturePath = this.fixPicturePath(filePath);

  }

  fixPicturePath(initialPath: string): string {
    const filePath = initialPath;
  
    const startIndex = filePath.lastIndexOf("\\Users\\");
    const extractedPath = filePath.substring(startIndex);
    const correctedPath = extractedPath.replace(/\\/g, "/");
    const picturePath = environment.user_files + correctedPath;

    const cacheBuster = Date.now().toString();
    const updatedPicturePath = picturePath + `?v=${cacheBuster}`;
  
    console.log(picturePath);
  
    return picturePath;
  }
  

  filterPatients(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm) {
      this.filteredPatients = this.patients.filter(patient =>
        (patient.name.toLowerCase() + ' ' + patient.familyName.toLowerCase()).includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredPatients = null;
    }
  }

  viewMedicalHistory(patient: any) {
    // Navigate to the medical history page with the patient's ID as a route parameter
    this.router.navigate(['/medical-history', patient.patientId]);
  }
}





interface Patient {
  patientId: number;
  picturePath: string;
  name: string;
  familyName: string;
  phoneNumber: string;
  cnp: string;
}
