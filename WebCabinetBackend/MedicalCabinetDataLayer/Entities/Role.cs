﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetDataLayer.Entities
{
    public class Role
    {
        public long? RoleId { get; set; }
        public string? RoleName { get; set; }

        public ICollection<User>? Users { get; set; }
    }
}
