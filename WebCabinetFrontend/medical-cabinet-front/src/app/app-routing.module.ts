import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { DoctorPageMedicalhistoryComponent } from './doctor-page-medicalhistory/doctor-page-medicalhistory.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminPageEditpatientComponent } from './admin-page-editpatient/admin-page-editpatient.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { RoleGuard } from './roleguard.service';
import { AdminPageAddpatientComponent } from './admin-page-addpatient/admin-page-addpatient.component';


const routes: Routes = [
  // add routes and components
  { path: '', component: HomeComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent},
  { path: 'user-page', component: UserPageComponent, canActivate: [RoleGuard], data: { allowedRoles: [1] } },
  { path: 'doctor-page', component: DoctorPageComponent, canActivate: [RoleGuard], data: { allowedRoles: [2] } },
  { path: 'admin-page', component: AdminPageComponent, canActivate: [RoleGuard], data: { allowedRoles: [3] } },
  { path: 'medical-history/:id', component: DoctorPageMedicalhistoryComponent, canActivate: [RoleGuard], data: { allowedRoles: [2] } },
  { path: 'add-patient', component: AdminPageAddpatientComponent, canActivate: [RoleGuard], data: { allowedRoles: [3] } },
  { path: 'edit-patient/:id', component: AdminPageEditpatientComponent },
  { path: 'registration-success', component: RegistrationSuccessComponent},
  { path: '**', component: HomeComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
