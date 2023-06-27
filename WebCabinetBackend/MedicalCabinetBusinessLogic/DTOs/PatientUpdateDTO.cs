using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace MedicalCabinetBusinessLogic.DTOs
{
    public class PatientUpdateDTO
    {
        [Required]
        public long? userId { get; set; }
        [Required]
        public long? patientId { get; set; }

        [Required]
        public string? email { get; set; }

        [Required]
        public string? familyName { get; set; }
        
        [Required]
        public string? name { get; set; }

        [Required]
        public string? telephone { get; set; }

        [Required]
        public string? cnp { get; set; }

        [Required]
        public DateTime dateOfBirth { get; set; }

        public IFormFile? profilePicture { get; set; }

        public string? password { get; set; }

    }
}
