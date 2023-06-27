import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/get-all-doctors');
  }

  getDoctorByUserID(id: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/get-doctor-by-userid'+'/'+id);
  }

  updateDoctor(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/update-doctor`;
    const headers = new HttpHeaders();
    // Remove the default Content-Type header
    headers.delete('Content-Type');
    return this.http.patch<any>(url, formData, { headers });
  }

  deleteDoctorByDoctorId(doctorId: number): Observable<any>
  {
    const url = `${this.apiUrl}/delete-doctor`+'/'+doctorId;
    const headers = new HttpHeaders();
    // Remove the default Content-Type header
    headers.delete('Content-Type');
    return this.http.delete<any>(url);

  }
  

}
