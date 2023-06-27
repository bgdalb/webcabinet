using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
using MedicalCabinetDataLayer.Entities;
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

        

        [HttpGet("/get-all-services")]
        public ActionResult<List<Service>> GetAll()
        {
            var result = serviceService.GetAll();

            return Ok(result);
        }

        [HttpGet("/get-all-services-by-doctor-id/{DoctorID}")]
        public ActionResult<List<Service>> GetServicesByDoctorID(long DoctorID)
        {
            var result = serviceService.GetServicesByDoctorID(DoctorID);

            if (result == null)
            {
                return BadRequest("No services for that doctor.");
            }

            return Ok(result);

        }


        [HttpPost("/add-service")]
        public IActionResult AddService([FromForm] ServiceAddDTO payload)
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
