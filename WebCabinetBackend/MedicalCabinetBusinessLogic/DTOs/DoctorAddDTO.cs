using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.DTOs
{
    public class DoctorAddDTO
    {
        [Required]
        public string? FamilyName { get; set; }

        [Required]
        public string? Surname { get; set; }
        [Required]
        public string? Telephone { get; set; }
        [Required]
        public long? UserId { get; set; }

    }
}
