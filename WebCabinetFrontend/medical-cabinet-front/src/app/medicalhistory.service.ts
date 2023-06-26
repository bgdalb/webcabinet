import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalhistoryService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  addMedicalHistory(formData: FormData): Observable<any>{

    const url = `${this.apiUrl}/add-medicalhistory`;
    const headers = new HttpHeaders();
    // Remove the default Content-Type header
    headers.delete('Content-Type');
    return this.http.post<any>(url, formData, { headers });
  }

  getMedicalHistoriesByPatientId(id: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/get-medicalhistory-by-patientId'+'/'+id);
  }

}
