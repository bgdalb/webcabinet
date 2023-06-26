import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { firstValueFrom } from 'rxjs';
import { ServicesService } from '../services.service';
import { SharedDeviceService } from '../shared-device.service';
import { PatientService } from '../patient-service.service';


@Component({
  selector: 'app-user-page-calendar',
  templateUrl: './user-page-calendar.component.html',
  styleUrls: ['./user-page-calendar.component.scss']
})


export class UserPageCalendarComponent {

  appointmentsOfThisDoctor : Appointment[] = [];
  
  servicesOfThisDoctor : Service[] = [];
  currentDate: Date = new Date();
  days: Date[] = [];
  hours: number[] = [];
  bookedTimeSlots: number[] = [9, 12, 13]; // Example: booked time slots
  selected_hour!: number;
  selected_date!: Date;
  @Input() selectedDoctor!: Doctor;
  @Input() selectedService!: Service;
  @Output() appointmentSent: EventEmitter<void> = new EventEmitter<void>();

  workingHours = {
    start: 8, // Start hour of the working day
    end: 16, // End hour of the working day
  };


  constructor(private appointmentService: AppointmentService,
     private servicesService : ServicesService,
      private sharedDeviceService : SharedDeviceService,
      private patientService : PatientService) {}

  async ngOnInit() {
    this.appointmentsOfThisDoctor = await firstValueFrom(this.appointmentService.getAllAppointmentsByDoctorId(this.selectedDoctor.doctorId));
    this.servicesOfThisDoctor = await firstValueFrom(this.servicesService.getAllServicesByDoctorId(this.selectedDoctor.doctorId));
    this.updateHours();
    console.log(this.appointmentsOfThisDoctor);
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
      const selectedServiceDuration = this.selectedService.estimatedDuration;
      const durationParts = selectedServiceDuration.split(':');
      const durationHours = parseInt(durationParts[0]);
  
      // Get the end hour based on the estimated duration and selected hour
      const endHour = hour + durationHours;
  
      // Check if the time slot is within the working hours of the day
      const isWithinWorkingHours = endHour <= this.workingHours.end + 1;
  
      // Check if the selected time slot overlaps with existing booked hours
      const isOverlap = this.bookedTimeSlots.some(bookedHour => (bookedHour >= hour && bookedHour < endHour));
  
      if (!isOverlap && isWithinWorkingHours) {
        // Handle the time slot selection logic for non-overlapping slots within working hours
        console.log('Selected time slot:', hour);
        this.selected_hour = hour;
        const selectedDate = new Date(currentDate);
        selectedDate.setHours(hour);
        selectedDate.setMinutes(0);
        selectedDate.setSeconds(0);
        console.log('Selected day:', selectedDate);
        this.selected_date = selectedDate;
        console.log('Selected doctor:', this.selectedDoctor);
        console.log('Selected service:', this.selectedService);
      }
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

  
  onDoctorServiceSelected(data: { doctor: Doctor, service: Service }) {
    this.selectedDoctor = data.doctor;
    this.selectedService = data.service;
    // Call a method to load the doctor's appointments based on the selected doctor and service
    //this.loadDoctorAppointments();
  }

  loadDoctorAppointments() {
    // Clear the bookedTimeSlots array
    this.bookedTimeSlots = [];
  
    // Iterate through the fetched appointments
    for (const appointment of this.appointmentsOfThisDoctor) {
      const appointmentDate = new Date(appointment.appointmentDate);
      const appointmentHour = appointmentDate.getHours();
      const appointmentDay = appointmentDate.getDate();
      const serviceOfTheAppointment = this.servicesOfThisDoctor.find(service => service.serviceId === appointment.serviceId);
  
      // Check if the appointment's date matches the current date
      if (appointmentDate.toDateString() === this.currentDate.toDateString()) {
        // Calculate the end hour based on the estimated duration of the service
        if(serviceOfTheAppointment){
        const durationParts = serviceOfTheAppointment.estimatedDuration.split(':');
        const durationHours = parseInt(durationParts[0]);
        const endHour = appointmentHour + durationHours;
  
        // Mark the time slots within the duration as booked
        for (let hour = appointmentHour; hour < endHour; hour++) {
          this.bookedTimeSlots.push(hour);
        }
      }

      }
    }
  }
  
  
  

  async doSomething(){
    
    
    const user = this.sharedDeviceService.getUser();
    const patient = await firstValueFrom(this.patientService.getPatientByUserID(user.userId));
    const appointmentData = {
      doctorId: this.selectedDoctor.doctorId,
      patientId: patient.patientId,
      serviceId: this.selectedService.serviceId,
      appointmentDate: this.getCurrentDateTime(this.selected_hour, this.selected_date)
    };
    console.log(appointmentData)
    this.appointmentService.addApointment(appointmentData).subscribe(
      (response) => {
        this.appointmentSent.emit();
        console.log('Response:', response);
       
      },
      (error) => {
        
        console.error('Error:', error);
        
      },
      () => {
        
        console.log('Request completed');
      }
    );
  }



}



interface Service
{
  serviceId : number,
  serviceName : string,
  estimatedDuration : string,
  doctorId : number

}

interface Doctor
{
  
  doctorId : number,
  familyName : string,
  name : string,
  telephone : string,
  userId : number,
  doctorTitle : string,
  picturePath : string

}

interface Appointment
{
  appointmentId : number,
  doctorId : number,
  patientId : number,
  serviceId : number,
  appointmentDate : string

}