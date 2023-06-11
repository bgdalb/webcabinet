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
    public class RoleService
    {


        private readonly UnitOfWork unitOfWork;

        public RoleService(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;

        }

        public List<Role> GetAll()
        {
            var result = unitOfWork.Roles.GetAllRoles();

            return result;
        }

        public RoleAddDTO AddRole(RoleAddDTO payload)
        {
            if (payload == null) return null;

            var role = new Role
            {
                RoleName = payload.RoleName

            };

            unitOfWork.Roles.InsertRole(role);
            unitOfWork.SaveChanges();

            return payload;
        }
    }
}
