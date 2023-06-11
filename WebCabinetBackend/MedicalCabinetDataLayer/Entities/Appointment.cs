using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetDataLayer.Entities
{
    public class Appointment
    {
        public long? AppointmentId { get; set; }
        public long? DoctorId { get; set; }
        public long? PatientId { get; set; }
        public long? ServiceId { get; set; }
        public DateTime? AppointmentDate { get; set; }

        public Doctor? Doctor { get; set; }
        public Patient? Patient { get; set; }
        public Service? Service { get; set; }
    }
}
