using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.DTOs
{
    public class DoctorRegisterDTO
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

        public string? DoctorTitle { get; set; }


        public IFormFile? ProfilePicture { get; set; }

    }
}
