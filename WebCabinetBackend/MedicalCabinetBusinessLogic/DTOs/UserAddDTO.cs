using MedicalCabinetDataLayer;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.DTOs
{
    public class UserAddDTO
    {

        [Required]
        public string? Email { get; set;}

        [Required]
        public string? Password { get; set;}

        [Required]
        public RoleEnums? RoleId { get; set;}

        [Required]
        public string? PicturePath { get; set;}


    }
}
