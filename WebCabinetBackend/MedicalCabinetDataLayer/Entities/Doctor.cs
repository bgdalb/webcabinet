﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetDataLayer.Entities
{
    public class Doctor
    {
        public long? DoctorId { get; set; }
        public string? FamilyName { get; set; }
        public string? Name { get; set; }
        public string? Telephone { get; set; }
        public long? UserId { get; set; }
        public string? DoctorTitle { get; set; }
        public string? PicturePath { get; set; }

        public User? User { get; set; }
        public ICollection<Service>? Services { get; set; }
        public ICollection<Appointment>? Appointments { get; set; }
    }
}
