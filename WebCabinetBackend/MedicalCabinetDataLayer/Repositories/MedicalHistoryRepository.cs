using MedicalCabinetDataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MedicalCabinetDataLayer.Repositories
{
    public class MedicalHistoryRepository
    {
        private readonly MedicalCabinetContext dbContext;

        public MedicalHistoryRepository(MedicalCabinetContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public MedicalHistory GetMedicalHistoryById(long id)
        {
            var result = dbContext.MedicalHistories
                .Where(mh => mh.MedicalHistoryId == id)
                .FirstOrDefault();

            return result;
        }

        public void InsertMedicalHistory(MedicalHistory medicalHistory)
        {
            dbContext.MedicalHistories.Add(medicalHistory);
        }

        public void UpdateMedicalHistory(MedicalHistory medicalHistory)
        {
            dbContext.MedicalHistories.Update(medicalHistory);
        }

        public void DeleteMedicalHistory(MedicalHistory medicalHistory)
        {
            dbContext.MedicalHistories.Remove(medicalHistory);
        }

        protected IQueryable<MedicalHistory> GetMedicalHistoryRecords()
        {
            return dbContext.MedicalHistories.AsQueryable<MedicalHistory>();
        }

        public bool AnyMedicalHistories(Func<MedicalHistory, bool> expression)
        {
            return GetMedicalHistoryRecords().Any(expression);
        }

        public List<MedicalHistory> GetAllMedicalHistories()
        {
            return GetMedicalHistoryRecords().ToList();
        }

        public List<MedicalHistory> GetMedicalHistoriesByPatientId(long patientId)
        {
            var result = dbContext.MedicalHistories
               .Where(mh => mh.PatientId == patientId)
               .ToList();

            return result;
        }

        public void DeleteMedicalHistoriesByPatientId(long patientId)
        {
            var medicalHistories = dbContext.MedicalHistories.Where(mh => mh.PatientId == patientId);
            dbContext.MedicalHistories.RemoveRange(medicalHistories);
            dbContext.SaveChanges();
        }

    }
}
