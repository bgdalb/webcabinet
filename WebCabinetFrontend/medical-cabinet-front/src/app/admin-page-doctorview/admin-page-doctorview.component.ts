import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedDeviceService } from '../shared-device.service';
import { DoctorService } from '../doctor.service';
import { UserServiceService } from '../user-service.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-page-doctorview',
  templateUrl: './admin-page-doctorview.component.html',
  styleUrls: ['./admin-page-doctorview.component.scss']
})
export class AdminPageDoctorviewComponent {
  

  constructor(private router: Router,  private sharedDeviceService: SharedDeviceService,  private doctorService: DoctorService, private userService: UserServiceService) {}

  filteredDoctors: any[] | null = null;
  doctors: any[] = [
  ];



  

  async ngOnInit(){

    const user = this.sharedDeviceService.getUser();
    
    this.doctors = await firstValueFrom(this.doctorService.getAllDoctors());
    console.log(this.doctors)
    for (const doctor of this.doctors) {
      const filePath = doctor.picturePath;
      doctor.picturePath = this.fixPicturePath(filePath);
      const doctorUserData = await firstValueFrom(this.userService.getUserEmailAndIdByDoctorId(doctor.doctorId));
      doctor.userId = doctorUserData.userId;
      doctor.email = doctorUserData.email;
      console.log(doctor);
    }


  }


  fixPicturePath(initialPath: string): string {
    const filePath = initialPath;
  
    const startIndex = filePath.lastIndexOf("\\Users\\");
    const extractedPath = filePath.substring(startIndex);
    const correctedPath = extractedPath.replace(/\\/g, "/");
    const picturePath = environment.user_files + correctedPath;
  
      // Append cache-busting query parameter
    const cacheBuster = Date.now().toString();
    const updatedPicturePath = picturePath + `?v=${cacheBuster}`;

    console.log(picturePath);
  
    return picturePath;
  }

  filterDoctors(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm) {
      this.filteredDoctors = this.doctors.filter(doctor =>
        (doctor.name.toLowerCase() + ' ' + doctor.familyName.toLowerCase()).includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredDoctors = null;
    }
  }


  addDoctor()
  {
    this.router.navigate(['/add-doctor'])
  }

  editDoctor(userDoctor: any): void {
    // Redirect to the edit page with doctor ID
    
    this.router.navigate(['/edit-doctor', userDoctor.doctorId]);
  }

  updateDoctor(doctor: Doctor) {
    // Implement logic to update the doctor's information in the database
    console.log('Updating doctor:', doctor);
  }

  async deleteDoctor(userDoctor: any) {
    try {
      // Delete the doctor from the database
      await firstValueFrom(this.doctorService.deleteDoctorByDoctorId(userDoctor.doctorId));
  
      // Remove the deleted doctor from the patients array
      this.doctors = this.doctors.filter(doctor => doctor.doctorId !== userDoctor.doctorId);
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  }
}





interface Doctor {
  id: number;
  photo: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;

}

