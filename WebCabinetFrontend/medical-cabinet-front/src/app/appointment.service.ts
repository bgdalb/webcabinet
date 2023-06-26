import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
   }

   getAllAppointmentsByDoctorId(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/get-all-appointments-by-doctor-id/'+doctorId);
  }
  
  addApointment(appointmentData : any): Observable<any>{
    console.log('am ajuns si aici')
    const url = `${this.apiUrl}/add-appointment`;
    const headers = new HttpHeaders();
    console.log(appointmentData)
    // Remove the default Content-Type header
    headers.delete('Content-Type');
    return this.http.post<any>(url, appointmentData);





  }
  
}


