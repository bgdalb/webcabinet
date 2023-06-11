using MedicalCabinetDataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MedicalCabinetDataLayer.Repositories
{
    public class ServiceRepository
    {
        private readonly MedicalCabinetContext dbContext;

        public ServiceRepository(MedicalCabinetContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Service GetServiceById(long id)
        {
            var result = dbContext.Services
                .Where(s => s.ServiceId == id)
                .FirstOrDefault();

            return result;
        }

        public void InsertService(Service service)
        {
            dbContext.Services.Add(service);
        }

        public void UpdateService(Service service)
        {
            dbContext.Services.Update(service);
        }

        public void DeleteService(Service service)
        {
            dbContext.Services.Remove(service);
        }

        protected IQueryable<Service> GetServiceRecords()
        {
            return dbContext.Services.AsQueryable<Service>();
        }

        public bool AnyServices(Func<Service, bool> expression)
        {
            return GetServiceRecords().Any(expression);
        }

        public List<Service> GetAllServices()
        {
            return GetServiceRecords().ToList();
        }
    }
}
