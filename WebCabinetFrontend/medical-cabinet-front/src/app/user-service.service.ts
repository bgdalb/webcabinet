import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models/entities/user';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  checkEmailExists(email: string): Observable<boolean>
  {
    const url = this.apiUrl + '/check-existing-email/'+ email;
    return this.http.get<boolean>(url); 
  }


  registerUser(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/register-user`;
    const headers = new HttpHeaders();
    // Remove the default Content-Type header
    headers.delete('Content-Type');
    return this.http.post<any>(url, formData, { headers });
  }

  checkValidCredentials(email: string, password:string ): Observable<any>
  {
    const url = this.apiUrl + '/valid-credentials/'+ email +'/'+ password;
    return this.http.get<boolean>(url); 
  }

  loginUser(formData: FormData): Observable<any>{

    const url = `${this.apiUrl}/login-user`;
    const headers = new HttpHeaders();
    // Remove the default Content-Type header
    headers.delete('Content-Type');
    return this.http.post<any>(url, formData, { headers });
  }



}
