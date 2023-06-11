using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicalCabinetAPI.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("/add-user")]
        public IActionResult AddUser([FromBody] UserAddDTO payload)
        {
            var result = userService.AddUser(payload);

            if (result == null)
            {
                return BadRequest("User cannot be added");
            }

            return Ok(result);
        }

    }
}
