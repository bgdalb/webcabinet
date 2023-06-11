using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicalCabinetAPI.Controllers
{
    [ApiController]
    [Route("api/role")]
    public class RoleController : ControllerBase
    {
        private readonly RoleService roleService;

        public RoleController(RoleService roleService)
        {
            this.roleService = roleService;
        }

        [HttpPost("/add-role")]
        public IActionResult AddRole([FromBody] RoleAddDTO payload)
        {
            var result = roleService.AddRole(payload);

            if (result == null)
            {
                return BadRequest("Role cannot be added");
            }

            return Ok(result);
        }

        // Add other actions for role entity as needed
    }
}
