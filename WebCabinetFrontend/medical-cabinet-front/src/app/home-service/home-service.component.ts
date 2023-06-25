import { Component } from '@angular/core';
import { DisplayServiceDTO } from '../models/dtos/display-services.dto';
import { environment } from 'src/environments/environment';


 
@Component({
  selector: 'app-home-service',
  templateUrl: './home-service.component.html',
  styleUrls: ['./home-service.component.scss']
})
export class HomeServiceComponent {

  services: DisplayServiceDTO[] = [];

  constructor(){
    this.services = [
      { name: 'Control general', picturePath: (environment.service_images +'/Service-1.jpg')},
      { name: 'Control cardiologie', picturePath: (environment.service_images +'/Service-2.jpg')},
      { name: 'Analize generale', picturePath: (environment.service_images +'/Service-3.jpg')},
      { name: 'Control dermatologic', picturePath: (environment.service_images +'/Service-4.jpg')},
    ]
  }

}
