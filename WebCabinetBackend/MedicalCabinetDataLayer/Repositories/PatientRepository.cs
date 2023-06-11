using MedicalCabinetDataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MedicalCabinetDataLayer.Repositories
{
    public class PatientRepository
    {
        private readonly MedicalCabinetContext dbContext;

        public PatientRepository(MedicalCabinetContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Patient GetPatientById(long id)
        {
            var result = dbContext.Patients
                .Where(p => p.PatientId == id)
                .FirstOrDefault();

            return result;
        }

        public void InsertPatient(Patient patient)
        {
            dbContext.Patients.Add(patient);
        }

        public void UpdatePatient(Patient patient)
        {
            dbContext.Patients.Update(patient);
        }

        public void DeletePatient(Patient patient)
        {
            dbContext.Patients.Remove(patient);
        }

        protected IQueryable<Patient> GetPatientRecords()
        {
            return dbContext.Patients.AsQueryable<Patient>();
        }

        public bool AnyPatients(Func<Patient, bool> expression)
        {
            return GetPatientRecords().Any(expression);
        }

        public List<Patient> GetAllPatients()
        {
            return GetPatientRecords().ToList();
        }
    }
}
