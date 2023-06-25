using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
using MedicalCabinetDataLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicalCabinetAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
                return BadRequest("Patient cannot be added");
            }

            return Ok(result);
        }

        [HttpGet("/get-all-patients")]
        public ActionResult<List<Patient>> GetAll()
        {
            var result = patientService.GetAll();

            return Ok(result);
        }

        [HttpGet("/get-patient-by-userid/{UserID}")]
        public ActionResult<Patient> GetPatientByUserid(long UserID)
        {
            var result = patientService.GetPatientByUserId(UserID);

            if (result == null)
            {
                return BadRequest("No such patient.");
            }

            return Ok(result);

        }
    }
}
