using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetDataLayer;
using MedicalCabinetDataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.Services
{
    public class MedicalHistoryService
    {
        private readonly UnitOfWork unitOfWork;

        public MedicalHistoryService(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;

        }

        public List<MedicalHistory> GetAll()
        {
            var result = unitOfWork.MedicalHistories.GetAllMedicalHistories();

            return result;
        }

        public MedicalHistoryAddDTO AddMedicalHistory(MedicalHistoryAddDTO payload)
        {
            if (payload == null) return null;

            var medicalHistory = new MedicalHistory
            {
                PatientId = payload.PatientId,
                FileName = payload.FileName,
                FileDescription = payload.FileDescription,
                FilePath = payload.FilePath

            };

            unitOfWork.MedicalHistories.InsertMedicalHistory(medicalHistory);
            unitOfWork.SaveChanges();

            return payload;
        }

    }
}
