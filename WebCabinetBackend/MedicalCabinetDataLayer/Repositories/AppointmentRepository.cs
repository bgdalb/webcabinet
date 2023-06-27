using MedicalCabinetDataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetDataLayer.Repositories
{
    public class AppointmentRepository
    {
       private readonly MedicalCabinetContext dbContext;
        

        public AppointmentRepository(MedicalCabinetContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Appointment GetAppointmentById(long id)
        {
            var result = dbContext.Appointments
                .Where(e => e.AppointmentId == id)
                .FirstOrDefault();

            return result;
        }

        public void InsertAppointment(Appointment appointment)
        {
            dbContext.Appointments.Add(appointment);
        }


        public void UpdateAppointment(Appointment appointment)
        {
            dbContext.Appointments.Update(appointment);
        }

        public void DeleteAppointment(Appointment appointment)
        {
            dbContext.Appointments.Remove(appointment);
        }

        protected IQueryable<Appointment> GetAppointmentRecords()
        {
            return dbContext.Appointments.AsQueryable<Appointment>();
        }

        public bool AnyAppointments(Func<Appointment, bool> expression)
        {
            return GetAppointmentRecords().Any(expression);
        }

        public List<Appointment> GetAllAppointments()
        {
            return GetAppointmentRecords().ToList();
        }

        public List<Appointment> GetAppointmentsByDoctorId(long doctorId)
        {
            var result = dbContext.Appointments
                .Where(a => a.DoctorId == doctorId)
                .ToList();

            return result;
        }

        public void DeleteAppointmentsByPatientId(long patientId)
        {
            var appointments = dbContext.Appointments.Where(a => a.PatientId == patientId);
            dbContext.Appointments.RemoveRange(appointments);
            dbContext.SaveChanges();
        }

        public void DeleteAppointmentsByDoctorId(long doctorId)
        {
            var appointments = dbContext.Appointments.Where(a => a.DoctorId == doctorId);
            dbContext.Appointments.RemoveRange(appointments);
            dbContext.SaveChanges();
        }
    }
}
