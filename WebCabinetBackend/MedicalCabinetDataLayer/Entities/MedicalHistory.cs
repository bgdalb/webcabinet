using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetDataLayer.Entities
{
    public class MedicalHistory
    {
        public long? MedicalHistoryId { get; set; }
        public long? PatientId { get; set; }
        public string? FileName { get; set; }
        public string? FileDescription { get; set; }
        public string? FilePath { get; set; }

        public Patient? Patient { get; set; }
    }
}
