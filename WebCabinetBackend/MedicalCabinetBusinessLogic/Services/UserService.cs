using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetDataLayer;
using MedicalCabinetDataLayer.Entities;
using Microsoft.AspNetCore.Http;

namespace MedicalCabinetBusinessLogic.Services
{
    public class UserService
    {
        private readonly UnitOfWork unitOfWork;
        private readonly PasswordHashService passwordHashService;
 

        public UserService(UnitOfWork unitOfWork, PasswordHashService passwordHashService)
        {
            this.unitOfWork = unitOfWork;
            this.passwordHashService = passwordHashService;
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
                Password = passwordHashService.HashPassword(payload.Password),
                RoleId = (long)payload.RoleId,
                
              
            };
            
            unitOfWork.Users.InsertUser(user);
            unitOfWork.SaveChanges();

            return payload;
        }

        public bool CheckExistingEmail(string email)
        {
            var result = unitOfWork.Users.CheckExistingEmail(email);
            return result;
        }

        public bool CheckValidCredentials(string email, string password)
        {
            var user = unitOfWork.Users.CheckValidCredentials(email,password);
            if (user != null && passwordHashService.VerifyPassword(password, user.Password))
            {
                return true; // Valid credentials
            }
            

            return false;
        }

        public PatientRegisterDTO RegisterUser(PatientRegisterDTO payload)
        {
            if (payload == null) return null;
            var user = new User
            {
                Email = payload.Email,
                Password = passwordHashService.HashPassword(payload.Password),
                RoleId = (long)RoleEnums.PATIENT,
            };

            unitOfWork.Users.InsertUser(user);
            unitOfWork.SaveChanges();

            User patientUser = unitOfWork.Users.GetUserByEmail(user.Email);


            string picturePath = string.Empty;

            IFormFile profilePicture = payload.ProfilePicture;

            if (profilePicture != null && profilePicture.Length > 0)
            {
                string fileName = Path.GetFileName(profilePicture.FileName);
                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "..","..","WebCabinetStorage", "Users", patientUser.UserId.ToString());
                string fileExtension = Path.GetExtension(fileName);
                picturePath = Path.Combine(folderPath, "profile_picture" + fileExtension);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                using (var stream = new FileStream(picturePath, FileMode.Create))
                {
                    profilePicture.CopyTo(stream);
                }
            }



            var patient = new Patient
            {
            FamilyName = payload.FamilyName,
            Name = payload.FirstName,
            Telephone = payload.PhoneNumber,
            CNP = payload.CNP,
            DateOfBirth = payload.DateOfBirth,
            PicturePath = picturePath,
            UserId = patientUser.UserId,
            };

            unitOfWork.Patients.InsertPatient(patient);
            unitOfWork.SaveChanges();

            return payload;

        }

        public UserAndRoleDTO LoginUser(UserLoginDTO payload) 
        {

            if (payload == null) return null;

            User currentUser = unitOfWork.Users.GetUserByCredentials(payload.Email, payload.Password);

            if (currentUser != null && passwordHashService.VerifyPassword(payload.Password, currentUser.Password))
            {
                var returnUser = new UserAndRoleDTO
                {
                    UserId = currentUser.UserId,
                    Email = currentUser.Email,
                    RoleId = (int?)currentUser.RoleId,
                }; // Valid credentials

                return returnUser;
            }


            return null;


        }

    }
}

