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
