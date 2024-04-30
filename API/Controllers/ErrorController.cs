using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        } 

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest( new ProblemDetails
            {
                Status = 400,
                Title = "This is a bad request",
            });
        } 

        [HttpGet("Unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        } 

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Name", "This field is required");
            ModelState.AddModelError("Email", "This field is required");
            return ValidationProblem();
        } 

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is some server error");
        } 
    }
}