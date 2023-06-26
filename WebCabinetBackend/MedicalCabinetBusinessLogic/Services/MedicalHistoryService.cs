using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetDataLayer;
using MedicalCabinetDataLayer.Entities;
using Microsoft.AspNetCore.Http;
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

            long userId = unitOfWork.Patients.GetUserIDbyPatientID((long)payload.PatientId);

            string filePath = string.Empty;
            IFormFile file = payload.File;

            if (file != null && file.Length > 0)
            {
                string fileName = Path.GetFileName(file.FileName);
                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "WebCabinetStorage", "Users", userId.ToString(), "Medical-Histories");
                string fileExtension = Path.GetExtension(fileName);
                filePath = Path.Combine(folderPath, payload.FileName + fileExtension);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }



            var medicalHistory = new MedicalHistory
            {
                PatientId = payload.PatientId,
                FileName = payload.FileName,
                FileDescription = payload.FileDescription,
                FilePath = filePath
            };

            unitOfWork.MedicalHistories.InsertMedicalHistory(medicalHistory);
            unitOfWork.SaveChanges();

            return payload;
        }

        public List<MedicalHistory> GetMedicalHistoriesByPatientId(long PatientId)
        {
            var result = unitOfWork.MedicalHistories.GetMedicalHistoriesByPatientId(PatientId);

            return result;
        }

    }
}
