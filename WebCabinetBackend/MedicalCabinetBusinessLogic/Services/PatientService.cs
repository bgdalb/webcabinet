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
    public class PatientService
    {
        private readonly UnitOfWork unitOfWork;

        public PatientService(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;

        }

        public List<Patient> GetAll()
        {
            var result = unitOfWork.Patients.GetAllPatients();

            return result;
        }

        public PatientAddDTO AddPatient(PatientAddDTO payload)
        {
            if (payload == null) return null;

            var patient = new Patient
            {
                FamilyName = payload.FamilyName,
                Surname = payload.Surname,
                Telephone = payload.Telephone,
                CNP = payload.CNP,
                DateOfBirth = payload.DateOfBirth,
                UserId = payload.UserId

            };

            unitOfWork.Patients.InsertPatient(patient);
            unitOfWork.SaveChanges();

            return payload;
        }
    }
}

