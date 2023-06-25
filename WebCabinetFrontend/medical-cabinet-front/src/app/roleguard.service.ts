import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SharedDeviceService } from './shared-device.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private sharedDeviceSerice: SharedDeviceService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Get the user information from the shared service
    const user = this.sharedDeviceSerice.getUser();
    console.log(user);
    const userRole = user?.roleId;
    console.log(userRole);

    // Define the allowed roles for each route
    const allowedRoles = route.data['allowedRoles'] as number[];

    // Check if the user's role is included in the allowed roles
    if (userRole && allowedRoles.includes(userRole)) {
      return true; // User is allowed to access the route
    }

    // Redirect to a default unauthorized page or login page
    return this.router.parseUrl('/'); // Replace '/' with your desired unauthorized page or login page route
  }
}
