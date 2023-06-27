using MedicalCabinetBusinessLogic.DTOs;
using MedicalCabinetBusinessLogic.Services;
using MedicalCabinetDataLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicalCabinetAPI.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;
        private readonly PatientService patientService;

        public UserController(UserService userService, PatientService patientService)
        {
            this.userService = userService;
            this.patientService = patientService;
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

        [HttpGet("/check-existing-email/{email}")]
        public ActionResult<bool> CheckExistingEmail(string email) 
        {
            var result = userService.CheckExistingEmail(email);
            return Ok(result);

        
        }

        [HttpGet("/check-existing-CNP/{cnp}")]
        public ActionResult<bool> CheckExistingCNP(string cnp)
        {
          
            var result = patientService.CheckExistingCNP(cnp);
     
       
            return Ok(result);


        }


        [HttpPost("/register-user")]
        public IActionResult RegisterUser([FromForm] PatientRegisterDTO payload)
        {
            // Access the uploaded file through the 'profilePicture' parameter
            // Save the file or perform any required operations

            var result = userService.RegisterUser(payload);
            if (result == null)
            {
                return BadRequest("User cannot be registered.");
            }

            return Ok(payload);
        }

        [HttpGet("/valid-credentials/{email}/{password}")]
        public ActionResult<bool> CheckValidCredentials(string email, string password)
        {

            var result = userService.CheckValidCredentials( email, password);


            return Ok(result);


        }


        [HttpPost("/login-user")]
        public IActionResult LoginUser([FromForm] UserLoginDTO payload)
        {
            // Access the uploaded file through the 'profilePicture' parameter
            // Save the file or perform any required operations

            var result = userService.LoginUser(payload);
            if (result == null)
            {
                return BadRequest("User cannot be logged in.");
            }

            return Ok(result);
        }

        [HttpGet("/get-useremailandid-by-patientid/{patientId}")]
        public ActionResult<UserIDandEmailDTO> GetUserEmailAndIdByPatientId(long patientId)
        {

            var result = userService.GetUserEmailAndIdByPatientId(patientId);

            if (result == null)
            {
                return BadRequest("No such data.");
            }

            return Ok(result);

        }






    }
}
