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
      { name: 'Control 1', picturePath: (environment.service_images +'/Service-1.jpg')},
      { name: 'Control 2', picturePath: (environment.service_images +'/Service-2.jpg')},
      { name: 'Control 3', picturePath: (environment.service_images +'/Service-3.jpg')}
    ]
  }

}
