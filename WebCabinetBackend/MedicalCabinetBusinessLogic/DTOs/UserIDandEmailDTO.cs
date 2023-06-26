using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic.DTOs
{
    public class UserIDandEmailDTO
    {
        [Required]
        public long? UserId { get; set; }
        [Required]
        public string? Email { get; set; }
        
    }
}
