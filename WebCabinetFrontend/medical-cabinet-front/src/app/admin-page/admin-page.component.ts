import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  currentView: string = 'patients';

  handleViewChange(view: string) {
    this.currentView = view;
    // Perform actions based on the selected view
  }

  


  
}
