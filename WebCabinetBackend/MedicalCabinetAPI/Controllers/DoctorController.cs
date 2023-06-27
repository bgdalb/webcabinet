using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
using MedicalCabinetDataLayer.Entities;
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

        [HttpGet("/get-all-doctors")]
        public ActionResult<List<Doctor>> GetAll()
        {
            var result = doctorService.GetAll();

            return Ok(result);
        }

        [HttpGet("/get-doctor-by-userid/{UserID}")]
        public ActionResult<Doctor> GetDoctorByUserid(long UserID)
        {
            var result = doctorService.GetDoctorByUserId(UserID);

            if (result == null)
            {
                return BadRequest("No such doctor.");
            }

            return Ok(result);

        }

        [HttpPatch("/update-doctor")]
        public IActionResult UpdateDoctor([FromForm] DoctorUpdateDTO payload)
        {
            // Access the uploaded file through the 'profilePicture' parameter
            // Save the file or perform any required operations

            var result = doctorService.UpdateDoctor(payload);
            if (result == null)
            {
                return BadRequest("Doctor cannot be updated.");
            }

            return Ok(payload);
        }


        [HttpDelete("/delete-doctor/{doctorId}")]
        public IActionResult DeleteDoctor(long doctorId)
        {
            var result = doctorService.DeleteDoctor(doctorId);
            if (result == false)
            {
                return BadRequest("Doctor cannot be deleted.");
            }

            return Ok(result);


        }
        // Add other actions for doctor entity as needed
    }
}
