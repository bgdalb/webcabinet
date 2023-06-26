import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedDeviceService } from '../shared-device.service';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient-service.service';
import { firstValueFrom } from 'rxjs';
import { CustomMessages } from 'src/utilities/custom_messages';
import { MedicalhistoryService } from '../medicalhistory.service';

@Component({
  selector: 'app-doctor-page-medicalhistory',
  templateUrl: './doctor-page-medicalhistory.component.html',
  styleUrls: ['./doctor-page-medicalhistory.component.scss']
})
export class DoctorPageMedicalhistoryComponent {

  constructor(private router: Router,
     private route: ActivatedRoute,
      private sharedDeviceService: SharedDeviceService,
       private doctorService: DoctorService,
        private patientService: PatientService,
        private medicalHistoryService: MedicalhistoryService) 
  {

    
  }
  fileName: string = '';
  fileDescription: string = '';
  doctor : any;
  selectedPatient: any | null = null;
  newFile: any;
  selectedFile: File | null = null;
  picturePath:any;
  patients: any[] = [
  ];

  medicalHistoriesOfThisPatient: any[] =[];
  errorOccurred = false;


  ngOnInit() {
    this.route.params.subscribe(async params => {
      const patientId = +params['id']; // Get the patient ID from the route parameter

      const user = this.sharedDeviceService.getUser();
    
      this.medicalHistoriesOfThisPatient = await firstValueFrom(this.medicalHistoryService.getMedicalHistoriesByPatientId(patientId));
      this.doctor = await firstValueFrom(this.doctorService.getDoctorByUserID(user.userId));
      this.patients = await firstValueFrom(this.patientService.getAllPatients());
      console.log(this.patients)
      //console.log(this.doctor)
      for (const patient of this.patients) {
        const filePath = patient.picturePath;
        patient.picturePath = this.fixPicturePath(filePath);
      }
      
      const filePath = this.doctor.picturePath;
      this.picturePath = this.fixPicturePath(filePath);
      // Fetch the selected patient from your data source
      this.selectedPatient = this.patients.find(patient => patient.patientId === patientId) || null;
    });
  }

  nameOfTheSite = CustomMessages.nameOfTheSite;

  fixPicturePath(initialPath: string): string {
    const filePath = initialPath;
  
    const startIndex = filePath.lastIndexOf("\\Users\\");
    const extractedPath = filePath.substring(startIndex);
    const correctedPath = extractedPath.replace(/\\/g, "/");
    const picturePath = environment.user_files + correctedPath;
  
    console.log(picturePath);
  
    return picturePath;
  }

  fixMedicalHistoriesPath(initialPath: string): string
  {
    const filePath = initialPath;
    const startIndex = filePath.lastIndexOf('\\Users');
    const extractedPath = filePath.substring(startIndex + 1);
    const correctedPath = extractedPath.replace(/\\/g, "/");
    const correctFilePath = environment.user_files+'/'+ correctedPath;
    console.log(correctFilePath);  
    return correctFilePath;
  }

  // Function to set the selected patient
  selectPatient(patient: any) {
    this.selectedPatient = patient;
  }

  refreshNewFile(event: Event){
    const searchTerm = (event.target as HTMLInputElement).value;
    this.newFile = searchTerm;
  }

  addNewFile() {
    // Check if all required fields are filled
    if (this.selectedPatient && this.fileName && this.fileDescription && this.selectedFile) {
      
      const formData = new FormData();
      formData.append('PatientId', this.selectedPatient.patientId);
      formData.append('FileName', this.fileName);
      formData.append('FileDescription', this.fileDescription);
      formData.append('File', this.selectedFile);

      this.medicalHistoryService.addMedicalHistory(formData).subscribe(
        async response => {
          // Handle the success response from the backend
          console.log('File added successfully:', response);
          this.medicalHistoriesOfThisPatient = await firstValueFrom(this.medicalHistoryService.getMedicalHistoriesByPatientId(this.selectedPatient.patientId));

                //this.selectedPatient.medicalHistory.push(newFile);
            this.selectedFile = null;
            this.newFile = ''; // Clear the input field
            this.fileName = ''; // Clear the filename input
            this.fileDescription = ''; // Clear the file description input
            this.errorOccurred = false;
        },
        error => {
          // Handle the error response from the backend
          console.error('Error adding file:', error);
          this.errorOccurred = true;
        }
      );

    } else {
      // Set the error state to true
      this.errorOccurred = true;
    }
  }


  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0];
      this.newFile = this.selectedFile.name;
      // You can also save the selectedFile object for further processing if needed
    }

    
  }
  downloadFile(filePath: string) {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.substring(filePath.lastIndexOf('\\') + 1);
    link.click();
  }
  
  viewFile(file: string) {
    const filePath = this.fixMedicalHistoriesPath(file);
    console.log('Viewing file:', filePath);
    window.open(filePath, '_blank');
  }
  


  goBackToDoctorView(){
    this.router.navigate(['/doctor-page']);
  }

}


interface Patient {
  id: number;
  photo: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  cnp: string;
  medicalHistory: string[];
}







