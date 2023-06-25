import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctor-page-calendar',
  templateUrl: './doctor-page-calendar.component.html',
  styleUrls: ['./doctor-page-calendar.component.scss']
})
export class DoctorPageCalendarComponent {

  doctor: string = 'Doctor Roberta Macovei';
  
  currentDate: Date = new Date();
  days: Date[] = [];
  hours: number[] = [];
  bookedTimeSlots: number[] = [9, 12, 13,14,15]; // Example: booked time slots
  patients: Patient[] = [
    {
      id: 1,
      photo: (environment.patient_images +'/patient-1.jpg'),
      name: 'Robert',
      surname: 'Andrei',
      email: 'robert.andrei@gmail.com',
      phoneNumber: '0784754321',
      cnp: '1950403394321',
      medicalHistory: ['Control_ORL_24-04-14.pdf', 'Control_ORL_24-04-12.pdf', 'Control_ORL_24-04-17.pdf']
    },
    {
      id: 2,
      photo: (environment.patient_images +'/patient-2.jpg'),
      name: 'Cristea',
      surname: 'Adrian',
      email: 'crsadrian@gmail.com',
      phoneNumber: '0784432412',
      cnp: '1950204394124',
      medicalHistory: ['Control_Dermatologic_26-07-15.pdf', 'Control_Dermatologic_26-01-22.pdf']
    },
    {
      id: 3,
      photo: (environment.patient_images +'/patient-3.jpg'),
      name: 'Adelin',
      surname: 'Vrabie',
      email: 'vradelin@yahoo.com',
      phoneNumber: '0784232459',
      cnp: '1910204344124',
      medicalHistory: ['Control_Dermatologic_11-03-2023.pdf']
    },

    {
      id: 4,
      photo: (environment.patient_images +'/patient-4.jpg'),
      name: 'Roberta',
      surname: 'Alexandre',
      email: 'rob.alex@unitbv.ro',
      phoneNumber: '0784332314',
      cnp: '2910204354714',
      medicalHistory: []
    },

    {
      id: 5,
      photo: (environment.patient_images +'/patient-5.jpg'),
      name: 'Eureka',
      surname: 'Valeha',
      email: 'evval@gmail.com',
      phoneNumber: '0794143121',
      cnp: '2970122414514',
      medicalHistory: []
    },
  ];

    
  constructor() {
    
  }

  ngOnInit() {
    this.updateHours();
  }

  updateHours() {
    const dayOfWeek = this.currentDate.getDay();
    
    if (dayOfWeek === 0) {
      // Sunday (No hours)
      this.hours = [];
    } else if (dayOfWeek === 6) {
      // Saturday (10-16)
      this.hours = Array.from({ length: 7 }, (_, i) => i + 10);
    } else {
      // Weekdays (8-16)
      this.hours = Array.from({ length: 9 }, (_, i) => i + 8);
    }
  }

  isTimeBooked(hour: number): boolean {
    return this.bookedTimeSlots.includes(hour);
  }

  previousDay() {
    const previousDate = new Date(this.currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
  
    // Get yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
  
    // Check if the previous date is greater than or equal to yesterday
    if (previousDate >= yesterday) {
      this.currentDate = previousDate;
      this.updateHours();
    }
  }

  nextDay() {
    const nextDate = new Date(this.currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    this.currentDate = nextDate;
    this.updateHours();
  }

  getRandomPatientName(): string {
    const bookedPatients = this.patients;
    const randomIndex = Math.floor(Math.random() * bookedPatients.length);
    return bookedPatients[randomIndex]?.surname +' '+ bookedPatients[randomIndex]?.name || '';
  }

}

interface Patient {
  id: number;
  photo: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  cnp: string;
  medicalHistory: string[];
}
