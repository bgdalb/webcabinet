using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
using MedicalCabinetDataLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicalCabinetAPI.Controllers
{
    [ApiController]
    [Route("api/medicalhistory")]
    public class MedicalHistoryController : ControllerBase
    {
        private readonly MedicalHistoryService medicalHistoryService;

        public MedicalHistoryController(MedicalHistoryService medicalHistoryService)
        {
            this.medicalHistoryService = medicalHistoryService;
        }

        [HttpPost("/add-medicalhistory")]
        public IActionResult AddMedicalHistory([FromForm] MedicalHistoryAddDTO payload)
        {
            var result = medicalHistoryService.AddMedicalHistory(payload);

            if (result == null)
            {
                return BadRequest("Medical history cannot be added");
            }

            return Ok(result);
        }

        [HttpGet("/get-medicalhistory-by-patientId/{patientId}")]
        public ActionResult<List<MedicalHistory>> GetMedicalHistoriesByPatientId(long patientId) 
        {
            var result = medicalHistoryService.GetMedicalHistoriesByPatientId(patientId);

            if (result == null)
            {
                return BadRequest("No medical histories for this patient.");
            }

            return Ok(result);

        }



        // Add other actions for medical history entity as needed
    }
}
