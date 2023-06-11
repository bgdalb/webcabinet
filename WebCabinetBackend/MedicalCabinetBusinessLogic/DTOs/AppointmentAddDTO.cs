using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.DTOs
{
    public class AppointmentAddDTO
    {
        
        [Required]
        public long? DoctorId { get; set; }
        [Required]
        public long? PatientId { get; set; }
        [Required]
        public long? ServiceId { get; set; }
        [Required]
        public DateTime? AppointmentDate { get; set; }
    }
}
