using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.DTOs
{
    public class PatientAddDTO
    {
        [Required]
        public string? FamilyName { get; set; }

        [Required]
        public string? Surname { get; set; }
        [Required]
        public string? Telephone { get; set; }
        [Required]
        public string? CNP { get; set; }
        [Required]
        public DateTime? DateOfBirth { get; set; }
        [Required]
        public long? UserId { get; set; }
    }
}
