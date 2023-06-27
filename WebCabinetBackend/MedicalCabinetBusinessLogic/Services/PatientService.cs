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
    public class PatientService
    {
        private readonly UnitOfWork unitOfWork;
        private readonly PasswordHashService passwordHashService;
        public PatientService(UnitOfWork unitOfWork, PasswordHashService passwordHashService)
        {
            this.unitOfWork = unitOfWork;
            this.passwordHashService = passwordHashService;

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
                Name = payload.Surname,
                Telephone = payload.Telephone,
                CNP = payload.CNP,
                DateOfBirth = payload.DateOfBirth,
                UserId = payload.UserId

            };

            unitOfWork.Patients.InsertPatient(patient);
            unitOfWork.SaveChanges();

            return payload;
        }

        public bool CheckExistingCNP(string cnp)
        {
            var result = unitOfWork.Patients.CheckExistingCNP(cnp);
            return result;
        }

        public Patient GetPatientByUserId(long UserID)
        {
            var result = unitOfWork.Patients.GetPatientByUserID(UserID);
            return result;
        }


        public PatientUpdateDTO UpdatePatient(PatientUpdateDTO payload)
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

            User patientUser = unitOfWork.Users.GetUserById((long)payload.patientId);


            Patient patientToUpdate = unitOfWork.Patients.GetPatientById((long)payload.patientId);

            var picturePath = "";

            if (patientToUpdate != null) {

                //Take new profile picture
                IFormFile profilePicture = payload.profilePicture;

                // If the profile picture ok
                if (profilePicture != null && profilePicture.Length > 0)
                {
                    // Take the name
                    string fileName = Path.GetFileName(profilePicture.FileName);
                    //Path to be saved in
                    string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "WebCabinetStorage", "Users", patientToUpdate.UserId.ToString());
                    //Take extension
                    string fileExtension = Path.GetExtension(fileName);
                    // Create the path of the file
                    picturePath = Path.Combine(folderPath, "profile_picture" + fileExtension);

                    //Delete the previous file
                    File.Delete(patientToUpdate.PicturePath);

                    //Create this new photo
                    using (var stream = new FileStream(picturePath, FileMode.Create))
                    {
                        profilePicture.CopyTo(stream);
                    }

                    //Update photo path
                    patientToUpdate.PicturePath = picturePath;
                }

                //update the rest of fields
                patientToUpdate.FamilyName = payload.familyName;
                patientToUpdate.Name = payload.name;
                patientToUpdate.Telephone = payload.telephone;
                patientToUpdate.CNP = payload.cnp;
                patientToUpdate.DateOfBirth = payload.dateOfBirth;

                unitOfWork.Patients.UpdatePatient(patientToUpdate);
                unitOfWork.SaveChanges();

            }
            else
            {
                return null;
            }


            return payload;

        }


        public bool DeletePatient(long patientId) 
        {
            if (patientId == null) return false;

            var patientToDelete = unitOfWork.Patients.GetPatientById(patientId);
            if (patientToDelete == null) return false;

            var patientIdSave = patientToDelete.PatientId;
            var userPatientId = unitOfWork.Patients.GetUserIDbyPatientID(patientId);

            //Delete medical histories

            //Physical deletion of files
            var medicalHistoriesOfPatient = unitOfWork.MedicalHistories.GetMedicalHistoriesByPatientId(patientId);
            foreach (var medicalHistory in medicalHistoriesOfPatient)
            {
                var filePath = medicalHistory.FilePath;
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
            }

            //Database delete
            unitOfWork.MedicalHistories.DeleteMedicalHistoriesByPatientId(patientId);
            unitOfWork.SaveChanges();

            //Delete appointments related to user
            unitOfWork.Appointments.DeleteAppointmentsByPatientId(patientId);
            unitOfWork.SaveChanges();

            //Delete the profile pic

            if (File.Exists(patientToDelete.PicturePath))
            {
                File.Delete(patientToDelete.PicturePath);
            }

            //Delete the patient
            unitOfWork.Patients.DeletePatient(patientToDelete);
            unitOfWork.SaveChanges();


            //Delete the credentials
            var userPatient = unitOfWork.Users.GetUserById(userPatientId);
            if (userPatient == null) return false;

            unitOfWork.Users.DeleteUser(userPatient);
            unitOfWork.SaveChanges();





            return true;

        }

    }
}

