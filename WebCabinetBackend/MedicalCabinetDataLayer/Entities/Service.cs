using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetDataLayer.Entities
{
    public class Service
    {
        public long? ServiceId { get; set; }
        public string? ServiceName { get; set; }
        public TimeSpan? EstimatedDuration { get; set; }

        public string? PicturePath { get; set; }
        public long? DoctorId { get; set; }

        public Doctor? Doctor { get; set; }
        public ICollection<Appointment>? Appointments { get; set; }
    }
}
