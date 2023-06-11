using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
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

        // Add other actions for appointment entity as needed
    }
}
