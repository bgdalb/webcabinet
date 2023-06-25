using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
using MedicalCabinetDataLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicalCabinetAPI.Controllers
{
    [ApiController]
    [Route("api/appointment")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentService appointmentService;

        public AppointmentController(AppointmentService appointmentService)
        {
            this.appointmentService = appointmentService;
        }

        [HttpPost("/add-appointment")]
        public IActionResult AddAppointment([FromBody] AppointmentAddDTO payload)
        {
            var result = appointmentService.AddAppointment(payload);

            if (result == null)
            {
                return BadRequest("Appointment cannot be added");
            }

            return Ok(result);
        }


        [HttpGet("/get-all-appointments-by-doctor-id/{DoctorID}")]
        public ActionResult<List<Appointment>> GetAppointmentsByDoctorId(long DoctorID)
        {
            var result = appointmentService.GetAppointmentsByDoctorId(DoctorID);

            if (result == null)
            {
                return BadRequest("No appointments for that doctor.");
            }

            return Ok(result);

        }

        // Add other actions for appointment entity as needed
    }
}
