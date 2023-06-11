using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetDataLayer;
using MedicalCabinetDataLayer.Entities;

namespace MedicalCabinetBusinessLogic.Services
{
    public class UserService
    {
        private readonly UnitOfWork unitOfWork;

        public UserService(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;

        }

        public List<User> GetAll()
        {
            var result = unitOfWork.Users.GetAllUsers();

            return result;
        }

        public UserAddDTO AddUser(UserAddDTO payload)
        {
            if (payload == null) return null;

            var user = new User
            {
                Email = payload.Email,
                Password = payload.Password,
                RoleId = (long)payload.RoleId,
                PicturePath = payload.PicturePath
              
            };

            unitOfWork.Users.InsertUser(user);
            unitOfWork.SaveChanges();

            return payload;
        }




    }
}

