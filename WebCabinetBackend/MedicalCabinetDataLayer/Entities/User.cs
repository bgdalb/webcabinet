using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetDataLayer.Entities
{
    public class User
    {
        public long? UserId { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public long? RoleId { get; set; }


        public Role? Role { get; set; }
        public Patient? Patient { get; set; }
        public Doctor? Doctor { get; set; }
    }

}
