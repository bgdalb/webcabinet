using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicalCabinetAPI.Controllers
{
    [ApiController]
    [Route("api/patient")]
    public class PatientController : ControllerBase
    {
        private readonly PatientService patientService;

        public PatientController(PatientService patientService)
        {
            this.patientService = patientService;
        }

        [HttpPost("/add-patient")]
        public IActionResult AddPatient([FromBody] PatientAddDTO payload)
        {
            var result = patientService.AddPatient(payload);

            if (result == null)
            {
                return BadRequest("Patiet cannot be added");
            }

            return Ok(result);
        }

    }
}
