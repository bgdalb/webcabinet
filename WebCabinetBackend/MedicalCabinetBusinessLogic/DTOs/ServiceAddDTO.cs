using MedicalCabinetBusinessLogic.Converters;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.DTOs
{
    public class ServiceAddDTO
    {
        [Required]
        public string? ServiceName { get; set; }
        [Required]
        public TimeSpan? EstimatedDuration { get; set; }
        [Required]
        public long? DoctorId { get; set; }

        [Required]
        public IFormFile? Picture { get; set; }
    }
}
