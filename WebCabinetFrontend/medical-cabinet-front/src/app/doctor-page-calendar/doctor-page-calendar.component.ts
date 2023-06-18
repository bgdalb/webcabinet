import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctor-page-calendar',
  templateUrl: './doctor-page-calendar.component.html',
  styleUrls: ['./doctor-page-calendar.component.scss']
})
export class DoctorPageCalendarComponent {

  doctor: string = 'Doctor Alban';
  
  currentDate: Date = new Date();
  days: Date[] = [];
  hours: number[] = [];
  bookedTimeSlots: number[] = [9, 12, 13]; // Example: booked time slots
  patients: Patient[] = [
    {
      id: 1,
      photo: (environment.patient_images +'/patient-1.jpg'),
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      cnp: '1234567890',
      medicalHistory: ['file1.pdf', 'file2.pdf', 'file3.pdf']
    },
    {
      id: 2,
      photo: (environment.patient_images +'/patient-2.jpg'),
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '0987654321',
      cnp: '0987654321',
      medicalHistory: ['file4.pdf', 'file5.pdf']
    },
    {
      id: 3,
      photo: (environment.patient_images +'/patient-3.jpg'),
      name: 'Alice',
      surname: 'Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '9876543210',
      cnp: '9876543210',
      medicalHistory: ['file6.pdf']
    }];
    
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
