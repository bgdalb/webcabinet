using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
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
        public IActionResult AddMedicalHistory([FromBody] MedicalHistoryAddDTO payload)
        {
            var result = medicalHistoryService.AddMedicalHistory(payload);

            if (result == null)
            {
                return BadRequest("Medical history cannot be added");
            }

            return Ok(result);
        }

        // Add other actions for medical history entity as needed
    }
}
