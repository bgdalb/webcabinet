using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetDataLayer.Entities;
using MedicalCabinetDataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace MedicalCabinetBusinessLogic.Services
{
    public class ServiceService
    {
        private readonly UnitOfWork unitOfWork;

        public ServiceService(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;

        }

        public List<Service> GetAll()
        {
            var result = unitOfWork.Services.GetAllServices();

            return result;
        }

        public ServiceAddDTO AddService(ServiceAddDTO payload)
        {
            if (payload == null) return null;

            var service = new Service
            {
                DoctorId = payload.DoctorId,
                ServiceName = payload.ServiceName,
                EstimatedDuration = payload.EstimatedDuration

            };


            string picturePath = string.Empty;

            IFormFile profilePicture = payload.Picture;
            
            Guid myuuid = Guid.NewGuid();
            string myuuidAsString = myuuid.ToString();

            if (profilePicture != null && profilePicture.Length > 0)
            {
                string fileName = Path.GetFileName(profilePicture.FileName);
                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "WebCabinetStorage", "Services", myuuidAsString);
                string fileExtension = Path.GetExtension(fileName);
                picturePath = Path.Combine(folderPath, "service_picture" + fileExtension);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                using (var stream = new FileStream(picturePath, FileMode.Create))
                {
                    profilePicture.CopyTo(stream);
                }
            }

            service.PicturePath = picturePath;
            unitOfWork.Services.InsertService(service);
            unitOfWork.SaveChanges();

            return payload;
        }


        public List<Service> GetServicesByDoctorID(long DoctorID)
        {
            var result = unitOfWork.Services.GetServicesByDoctorId(DoctorID);
            return result;
        }
    }
}
