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

        [HttpPatch("/update-patient")]
        public IActionResult UpdatePatient([FromForm] PatientUpdateDTO payload)
        {
            // Access the uploaded file through the 'profilePicture' parameter
            // Save the file or perform any required operations

            var result = patientService.UpdatePatient(payload);
            if (result == null)
            {
                return BadRequest("Patient cannot be updated.");
            }

            return Ok(payload);
        }


        [HttpDelete("/delete-patient/{patientId}")]
        public IActionResult DeletePatient(long patientId) 
        {
            var result = patientService.DeletePatient(patientId);
            if (result == false)
            {
                return BadRequest("Patient cannot be deleted.");
            }

            return Ok(result);


        }
    }
}
