using MedicalCabinetDataLayer.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.DTOs
{
    public class MedicalHistoryAddDTO
    {
        [Required]
        public long? PatientId { get; set; }
        [Required]
        public string? FileName { get; set; }
        [Required]
        public string? FileDescription { get; set; }
        [Required]
        public string? FilePath { get; set; }

    }
}
