using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetDataLayer.Entities
{
    public class Patient
    {
        public long? PatientId { get; set; }
        public string? FamilyName { get; set; }
        public string? Name { get; set; }
        public string? Telephone { get; set; }
        public string? CNP { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? PicturePath { get; set; }
        public long? UserId { get; set; }

        public User? User { get; set; }
        public ICollection<MedicalHistory>? MedicalHistories { get; set; }
        public ICollection<Appointment>? Appointments { get; set; }
    }
}
