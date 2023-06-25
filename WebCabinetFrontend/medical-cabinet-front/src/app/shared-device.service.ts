import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDeviceService {
  private user: any;

  setUser(user: any): void {
    this.user = user;
  }

  getUser(): any {
    return this.user;
  }

  nullifyUser(): any{
    this.user = null;
  }
}
