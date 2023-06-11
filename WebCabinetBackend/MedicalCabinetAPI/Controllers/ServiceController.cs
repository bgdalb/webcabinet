using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicalCabinetAPI.Controllers
{
    [ApiController]
    [Route("api/service")]
    public class ServiceController : ControllerBase
    {
        private readonly ServiceService serviceService;

        public ServiceController(ServiceService serviceService)
        {
            this.serviceService = serviceService;
        }

        [HttpPost("/add-service")]
        public IActionResult AddService([FromBody] ServiceAddDTO payload)
        {
            var result = serviceService.AddService(payload);

            if (result == null)
            {
                return BadRequest("Service cannot be added");
            }

            return Ok(result);
        }

        // Add other actions for service entity as needed
    }
}
