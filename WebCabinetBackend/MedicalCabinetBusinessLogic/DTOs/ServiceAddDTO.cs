using MedicalCabinetBusinessLogic.Converters;
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
        [JsonConverter(typeof(TimeSpanConverter))]
        public TimeSpan? EstimatedDuration { get; set; }
        [Required]
        public long? DoctorId { get; set; }
    }
}
