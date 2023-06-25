using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetDataLayer.Entities;
using MedicalCabinetDataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.Services
{
    public class AppointmentService
    {
        private readonly UnitOfWork unitOfWork;

        public AppointmentService(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;

        }

        public List<Appointment> GetAll()
        {
            var result = unitOfWork.Appointments.GetAllAppointments();

            return result;
        }

        public AppointmentAddDTO AddAppointment(AppointmentAddDTO payload)
        {
            if (payload == null) return null;

            var appointment = new Appointment
            {
                DoctorId = payload.DoctorId,
                PatientId = payload.PatientId,
                ServiceId   = payload.ServiceId,
                AppointmentDate = payload.AppointmentDate

            };

            unitOfWork.Appointments.InsertAppointment(appointment);
            unitOfWork.SaveChanges();

            return payload;
        }


        public List<Appointment> GetAppointmentsByDoctorId(long DoctorID)
        {
            var result = unitOfWork.Appointments.GetAppointmentsByDoctorId(DoctorID);
            return result;
        }

    }

}
