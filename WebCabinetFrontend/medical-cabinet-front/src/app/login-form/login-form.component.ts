import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserServiceService } from '../user-service.service';
import { SharedDeviceService } from '../shared-device.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  showGenericError = false;
  showCredentialError = false;
  authenticationForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserServiceService, private sharedDeviceService: SharedDeviceService) {

    this.authenticationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
  }

  ngOnInit() {
  }



  
  async onSubmit() {
    if (this.authenticationForm.valid) {
      const formData = this.authenticationForm.value;
      const email = formData.email;
      const password = formData.password;
  
      this.showCredentialError = false;
  
      try {
        const credentialsValid = await firstValueFrom(this.userService.checkValidCredentials(email, password));
  
        if (credentialsValid) {
          const formDataSend = new FormData();
          formDataSend.append('email', email);
          formDataSend.append('password', password);
  
          try {
            this.userService.loginUser(formDataSend).subscribe(
              (response) => {
                console.log('Login successful:', response);
                // Perform further actions if needed
                this.authenticationForm.reset();
                const userId = response.userId;
                const roleId = response.roleId;
                const email = response.email;

                const constructResponse = {
                  userId,
                  roleId,
                  email
                }
                console.log(roleId) // Assuming the roleID is present in the response
                
                this.sharedDeviceService.setUser(constructResponse);
                this.showGenericError = false;
                this.showCredentialError = false;
                // Navigate based on the roleID and pass the user object
                switch (roleId) {
                  case 1: // Role 1
                  this.router.navigate(['/user-page']);
                  break;
                  case 2: // Role 2
                  this.router.navigate(['/doctor-page']);
                  break;
                  case 3: // Role 3
                  this.router.navigate(['/admin-page']);
                  break;
                  default: // Default route for unknown roles
                  this.router.navigate(['/']);
                  console.log('Routing error');
                  break;
                }

                
              },
              (error) => {
                console.log('Error during login:', error);
                this.showGenericError = true;
              }
            );
          } catch (error) {
            console.log('Error during login:', error);
            this.showGenericError = true;
          }
        }
        else
        {
          this.showCredentialError = true;
          console.log('Credentiale gresite')
        }
      } catch (error) {
        this.showGenericError=true;
        console.log('Error during credential validation:', error);
      }
    }
    else
    {
      this.showGenericError=true;
    }
  }
  
}
