import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-user-page-calendar',
  templateUrl: './user-page-calendar.component.html',
  styleUrls: ['./user-page-calendar.component.scss']
})


export class UserPageCalendarComponent {

  currentDate: Date = new Date();
  days: Date[] = [];
  hours: number[] = [];
  bookedTimeSlots: number[] = [9, 12, 13]; // Example: booked time slots
  selected_hour!: number;
  selected_date!: Date;
  @Input() selectedDoctor!: string;
  @Input() selectedService!: string;
  @Output() appointmentSent: EventEmitter<void> = new EventEmitter<void>();

  


  constructor() {}

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

  isTimeBooked(hour: number): boolean {
    return this.bookedTimeSlots.includes(hour);
  }

  selectTimeSlot(hour: number, currentDate: Date) {
    if (!this.isTimeBooked(hour)) {
      // Handle the time slot selection logic for non-booked slots
      console.log('Selected time slot:', hour);
      this.selected_hour = hour;
      const selectedDate = new Date(currentDate);
      selectedDate.setHours(hour);
      selectedDate.setMinutes(0);
      selectedDate.setSeconds(0);
      console.log('Selected day :', selectedDate);
      this.selected_date = selectedDate;
      console.log('Selected doctor :', this.selectedDoctor);
      console.log('Selected service :', this.selectedService);


      
    }
  }
  
  getCurrentDateTime(selectedHour: number, currentDate: Date): string {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based
    const day = currentDate.getDate();
    const hour = selectedHour;
  
    const dateTimeString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:00`;
  
    return dateTimeString;
  }

  
  onDoctorServiceSelected(data: { doctor: string, service: string }) {
    this.selectedDoctor = data.doctor;
    this.selectedService = data.service;
    // Call a method to load the doctor's appointments based on the selected doctor and service
    this.loadDoctorAppointments();
  }

  loadDoctorAppointments() {
    // Fetch the doctor's appointments using the selectedDoctor and selectedService properties
    // Update the calendar with the fetched appointments
  }

  doSomething(){
    
    this.appointmentSent.emit();
  }



}
