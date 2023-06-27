import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from './models/entities/patient';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl+'/get-all-patients');
  }

  getAllPatientsAny(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/get-all-patients');
  }

  checkCNPExists(cnp: string): Observable<boolean>
  {
    const url = this.apiUrl + '/check-existing-cnp/'+ cnp;
    return this.http.get<boolean>(url);
  }

  getPatientByUserID(id: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/get-patient-by-userid'+'/'+id);
  }

  
  updatePatient(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/update-patient`;
    const headers = new HttpHeaders();
    // Remove the default Content-Type header
    headers.delete('Content-Type');
    return this.http.patch<any>(url, formData, { headers });
  }

  deletePatientByPatientId(patientId: number): Observable<any>
  {
    const url = `${this.apiUrl}/delete-patient`+'/'+patientId;
    const headers = new HttpHeaders();
    // Remove the default Content-Type header
    headers.delete('Content-Type');
    return this.http.delete<any>(url);

  }
  // getPatientById(id: number): Observable<Patient> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get<Patient>(url);
  // }

  // createPatient(patient: Patient): Observable<Patient> {
  //   return this.http.post<Patient>(this.apiUrl, patient);
  // }

  // updatePatient(patient: Patient): Observable<Patient> {
  //   const url = `${this.apiUrl}/${patient.id}`;
  //   return this.http.put<Patient>(url, patient);
  // }

  // deletePatient(id: number): Observable<void> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.delete<void>(url);
  }

