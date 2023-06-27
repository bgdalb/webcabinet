using MedicalCabinetDataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MedicalCabinetDataLayer.Repositories
{
    public class DoctorRepository
    {
        private readonly MedicalCabinetContext dbContext;

        public DoctorRepository(MedicalCabinetContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Doctor GetDoctorById(long id)
        {
            var result = dbContext.Doctors
                .Where(d => d.DoctorId == id)
                .FirstOrDefault();

            return result;
        }

        public void InsertDoctor(Doctor doctor)
        {
            dbContext.Doctors.Add(doctor);
        }

        public void UpdateDoctor(Doctor doctor)
        {
            dbContext.Doctors.Update(doctor);
        }

        public void DeleteDoctor(Doctor doctor)
        {
            dbContext.Doctors.Remove(doctor);
        }

        protected IQueryable<Doctor> GetDoctorRecords()
        {
            return dbContext.Doctors.AsQueryable<Doctor>();
        }

        public bool AnyDoctors(Func<Doctor, bool> expression)
        {
            return GetDoctorRecords().Any(expression);
        }

        public List<Doctor> GetAllDoctors()
        {
            return GetDoctorRecords().ToList();
        }

        public Doctor GetDoctorByUserID(long id)
        {
            var result = dbContext.Doctors
                .Where(d => d.UserId == id)
                   .FirstOrDefault();

            return result;
        }

        public long GetUserIDbyDoctorID(long doctorId)
        {
            var result = dbContext.Doctors
                .Where(d => d.DoctorId == doctorId)
                .FirstOrDefault();

            return (long)result.UserId;
        }

    }
}
