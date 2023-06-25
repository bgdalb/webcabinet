using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.DTOs
{
    public class PatientRegisterDTO
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]

        public string? FamilyName { get; set; }
        [Required]

        public string? FirstName { get; set; }
        [Required]

        public string? PhoneNumber { get; set; }
        [Required]

        public string? CNP { get; set; }
        [Required]

        public DateTime DateOfBirth { get; set; }
        

        public IFormFile? ProfilePicture { get; set; }
    }
}
