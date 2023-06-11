using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicalCabinetAPI.Controllers
{
    [ApiController]
    [Route("api/doctor")]
    public class DoctorController : ControllerBase
    {
        private readonly DoctorService doctorService;

        public DoctorController(DoctorService doctorService)
        {
            this.doctorService = doctorService;
        }

        [HttpPost("/add-doctor")]
        public IActionResult AddDoctor([FromBody] DoctorAddDTO payload)
        {
            var result = doctorService.AddDoctor(payload);

            if (result == null)
            {
                return BadRequest("Doctor cannot be added");
            }

            return Ok(result);
        }

        // Add other actions for doctor entity as needed
    }
}
