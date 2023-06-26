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
    public class DoctorService
    {
        private readonly UnitOfWork unitOfWork;

        public DoctorService(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;

        }

        public List<Doctor> GetAll()
        {
            var result = unitOfWork.Doctors.GetAllDoctors();

            return result;
        }

        public DoctorAddDTO AddDoctor(DoctorAddDTO payload)
        {
            if (payload == null) return null;

            var doctor = new Doctor
            {
                FamilyName = payload.FamilyName,
                Name = payload.Surname,
                Telephone = payload.Telephone,
                UserId = payload.UserId

            };

            unitOfWork.Doctors.InsertDoctor(doctor);
            unitOfWork.SaveChanges();

            return payload;
        }

        public Doctor GetDoctorByUserId(long UserID)
        {
            var result = unitOfWork.Doctors.GetDoctorByUserID(UserID);
            return result;
        }

    }
}
