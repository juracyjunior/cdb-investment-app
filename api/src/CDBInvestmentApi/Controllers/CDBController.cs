using CDBInvestmentDomain.Models;
using CDBInvestmentDomain.Queries;
using CDBInvestmentService.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CDBInvestmentApi.Controllers
{
    [ApiController]
    [Route("api/cdb")]
    public class CDBController : ControllerBase
    {
        private readonly ILogger<CDBController> _logger;
        private readonly ICDBSimulatorService _service;

        public CDBController(ILogger<CDBController> logger,
            ICDBSimulatorService service)
        {
            _logger = logger;
            _service = service;
        }

        /// <summary>
        /// Simula o resgate de um investimento no CDB.
        /// </summary>
        /// <param name="value">Valor que será investido a cada mês.</param>
        /// <param name="months">Meses de investimento.</param>
        /// <returns>Retorna os valores bruto (gross) e líquido (net) a ser resgatado na aplicação.</returns>
        /// <response code="200">Retorna os valores calculados.</response>
        /// <response code="400">Se Value menor ou igual a 0 ou Months menor ou igual a 1.</response>
        /// <response code="500">Se der algum erro não tratado.</response>
        [HttpGet("simulate")]
        public ActionResult GetCBDSimulator([FromQuery] double value, [FromQuery] int months)
        {
            if (value <= 0 || months <= 1)
                return new BadRequestResult();

            try
            {
                var dto = new CDBSimulatorDTO { Value = value, Months = months };

                dto = _service.SimulateInvestment(dto);

                return new OkObjectResult(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError("Erro ao simular investimento CDB - {0}.", ex);

                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
