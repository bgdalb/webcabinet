using MedicalCabinetDataLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetDataLayer
{
    public class UnitOfWork
    {
        public AppointmentRepository Appointments { get; }
        public DoctorRepository Doctors { get; }
        public MedicalHistoryRepository MedicalHistories { get; }
        public PatientRepository Patients { get; }
        public RoleRepository Roles { get; }
        public ServiceRepository Services { get; }
        public UserRepository Users { get; }

        private readonly MedicalCabinetContext _dbContext;

        public UnitOfWork(
            MedicalCabinetContext dbContext,
            AppointmentRepository appointments,
            DoctorRepository doctors,
            MedicalHistoryRepository medicalHistories,
            PatientRepository patients,
            RoleRepository roles,
            ServiceRepository services,
            UserRepository users
        )
        {
            _dbContext = dbContext;
            Appointments = appointments;
            Doctors = doctors;
            MedicalHistories = medicalHistories;
            Patients = patients;
            Roles = roles;
            Services = services;
            Users = users;
        }

        public void SaveChanges()
        {
            try
            {
                _dbContext.SaveChanges();
            }
            catch (Exception exception)
            {
                var errorMessage = "Error when saving to the database: "
                    + $"{exception.Message}\n\n"
                    + $"{exception.InnerException}\n\n"
                    + $"{exception.StackTrace}\n\n";

                Console.WriteLine(errorMessage);
            }
        }
    }
}

