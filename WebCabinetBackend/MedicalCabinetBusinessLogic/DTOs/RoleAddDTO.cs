﻿using MedicalCabinetDataLayer;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.DTOs
{
    public class RoleAddDTO
    {

        [Required]
        public string? RoleName { get; set; }


    }
}
