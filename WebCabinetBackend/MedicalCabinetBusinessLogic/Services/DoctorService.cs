using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetDataLayer.Entities;
using MedicalCabinetDataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace MedicalCabinetBusinessLogic.Services
{
    public class DoctorService
    {
        private readonly UnitOfWork unitOfWork;
        private readonly PasswordHashService passwordHashService;

        public DoctorService(UnitOfWork unitOfWork, PasswordHashService passwordHashService)
        {
            this.unitOfWork = unitOfWork;
            this.passwordHashService = passwordHashService;

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


        public DoctorUpdateDTO UpdateDoctor(DoctorUpdateDTO payload)
        {
            if (payload == null) return null;
            var user = unitOfWork.Users.GetUserById((long)(payload.userId));

            //Update the user if exists if not error/null
            if (user != null)
            {
                user.Email = payload.email;
                if (payload.password != null)
                {
                    user.Password = passwordHashService.HashPassword(payload.password);
                }

                unitOfWork.Users.UpdateUser(user);
                unitOfWork.SaveChanges();
            }
            else
            {
                return null;
            }
            // We are sure the user exists so we can go on also we changed it


            Doctor doctorToUpdate = unitOfWork.Doctors.GetDoctorById((long)payload.doctorId);

            var picturePath = "";

            if (doctorToUpdate != null)
            {

                //Take new profile picture
                IFormFile profilePicture = payload.profilePicture;

                // If the profile picture ok
                if (profilePicture != null && profilePicture.Length > 0)
                {
                    // Take the name
                    string fileName = Path.GetFileName(profilePicture.FileName);
                    //Path to be saved in
                    string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "WebCabinetStorage", "Users", doctorToUpdate.UserId.ToString());
                    //Take extension
                    string fileExtension = Path.GetExtension(fileName);
                    // Create the path of the file
                    picturePath = Path.Combine(folderPath, "profile_picture" + fileExtension);

                    //Delete the previous file
                    if (File.Exists(doctorToUpdate.PicturePath))
                    {
                        File.Delete(doctorToUpdate.PicturePath);
                    }

                    //Create this new photo
                    using (var stream = new FileStream(picturePath, FileMode.Create))
                    {
                        profilePicture.CopyTo(stream);
                    }

                    //Update photo path
                    doctorToUpdate.PicturePath = picturePath;
                }

                //update the rest of fields
                doctorToUpdate.FamilyName = payload.familyName;
                doctorToUpdate.Name = payload.name;
                doctorToUpdate.Telephone = payload.telephone;
                doctorToUpdate.DoctorTitle = payload.doctorTitle;

                unitOfWork.Doctors.UpdateDoctor(doctorToUpdate);
                unitOfWork.SaveChanges();

            }
            else
            {
                return null;
            }


            return payload;

        }



        public bool DeleteDoctor(long doctorId)
        {
            if (doctorId == null) return false;

            var doctorToDelete = unitOfWork.Doctors.GetDoctorById(doctorId);
            if (doctorToDelete == null) return false;

            var doctorIdSave = doctorToDelete.DoctorId;
            var userDoctorId = unitOfWork.Doctors.GetUserIDbyDoctorID(doctorId);

 

            //Delete appointments related to doctor
            unitOfWork.Appointments.DeleteAppointmentsByPatientId(doctorId);
            unitOfWork.SaveChanges();

            //Delete the profile pic

            if (File.Exists(doctorToDelete.PicturePath))
            {
                File.Delete(doctorToDelete.PicturePath);
            }

            //Delete services related to doctor
            unitOfWork.Services.DeleteServicesByDoctorId(doctorId);
            unitOfWork.SaveChanges();


            //Delete the doctor
            unitOfWork.Doctors.DeleteDoctor(doctorToDelete);
            unitOfWork.SaveChanges();


            //Delete the credentials
            var userDoctor = unitOfWork.Users.GetUserById(userDoctorId);
            if (userDoctor == null) return false;

            unitOfWork.Users.DeleteUser(userDoctor);
            unitOfWork.SaveChanges();





            return true;

        }
    }
}
