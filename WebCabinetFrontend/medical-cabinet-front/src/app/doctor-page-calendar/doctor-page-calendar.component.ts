import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicesService } from '../services.service';
import { AppointmentService } from '../appointment.service';
import { SharedDeviceService } from '../shared-device.service';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient-service.service';

@Component({
  selector: 'app-doctor-page-calendar',
  templateUrl: './doctor-page-calendar.component.html',
  styleUrls: ['./doctor-page-calendar.component.scss']
})
export class DoctorPageCalendarComponent {

  //doctor: string = 'Doctor Roberta Macovei';
  
  appointmentsOfThisDoctor : any[] = [];
  
  servicesOfThisDoctor : any[] = [];
  currentDate: Date = new Date();
  days: Date[] = [];
  hours: number[] = [];
  bookedTimeSlots: any[] = [9, 12, 13,14,15]; // Example: booked time slots
  patients: any[] = [
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

  selectedDoctor: any;

    
  constructor(private appointmentService: AppointmentService,
    private servicesService : ServicesService,
    private sharedDeviceService : SharedDeviceService,
    private doctorService: DoctorService,
    private patientService: PatientService
    ) {
    
  }

  async ngOnInit() {
    const user = this.sharedDeviceService.getUser();
    this.selectedDoctor = await firstValueFrom(this.doctorService.getDoctorByUserID(user.userId)); 
    this.appointmentsOfThisDoctor = await firstValueFrom(this.appointmentService.getAllAppointmentsByDoctorId(this.selectedDoctor.doctorId));
    this.servicesOfThisDoctor = await firstValueFrom(this.servicesService.getAllServicesByDoctorId(this.selectedDoctor.doctorId));
    this.patients = await firstValueFrom(this.patientService.getAllPatientsAny())
    this.updateHours();
    console.log(this.appointmentsOfThisDoctor);
    this.loadDoctorAppointments();
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
    return this.bookedTimeSlots.some(slot => slot.hour === hour);
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
        if (serviceOfTheAppointment) {
          const durationParts = serviceOfTheAppointment.estimatedDuration.split(':');
          const durationHours = parseInt(durationParts[0]);
          const endHour = appointmentHour + durationHours;
  
          // Mark the time slots within the duration as booked
          for (let hour = appointmentHour; hour < endHour; hour++) {
            // Push an object with the hour, patient name, and service to the bookedTimeSlots array
            if (hour === appointmentHour) {
              const patient = this.patients.find(patient => patient.patientId === appointment.patientId);
              this.bookedTimeSlots.push({ hour, patientName: (patient.familyName +" "+patient.name) , serviceName: " - " + serviceOfTheAppointment.serviceName });
            } else {
              this.bookedTimeSlots.push({ hour });
            }
          }
        }
      }
    }
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
