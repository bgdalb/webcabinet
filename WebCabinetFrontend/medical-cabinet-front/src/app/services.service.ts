import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/get-all-services');
  }

  getAllServicesByDoctorId(doctorId: number): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'/get-all-services-by-doctor-id'+'/'+ doctorId)
  }

  addService(formData: FormData): Observable<any>{

    const url = `${this.apiUrl}/add-service`;
    const headers = new HttpHeaders();
    // Remove the default Content-Type header
  
    return this.http.post<any>(url, formData );
  }
}
