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

const routes: Routes = [
  // add routes and components
  { path: '', component: HomeComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent},
  { path: 'user-page', component: UserPageComponent},
  { path: 'doctor-page', component : DoctorPageComponent},
  { path: 'medical-history/:id', component: DoctorPageMedicalhistoryComponent },
  { path: 'admin-page', component: AdminPageComponent},
  { path: 'edit-patient/:id', component: AdminPageEditpatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
