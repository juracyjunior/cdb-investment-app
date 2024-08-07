using CDBInvestmentApi.Controllers;
using CDBInvestmentDomain.Models;
using CDBInvestmentDomain.Queries;
using CDBInvestmentService.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace CDBInvestmento.Tests.Controllers
{
    public class CDBControllerTests
    {
        private readonly Mock<ILogger<CDBController>> _mockLogger;
        private readonly Mock<ICDBSimulatorService> _mockService;
        private readonly CDBController _controller;

        public CDBControllerTests()
        {
            _mockLogger = new Mock<ILogger<CDBController>>();
            _mockService = new Mock<ICDBSimulatorService>();
            _controller = new CDBController(_mockLogger.Object, _mockService.Object);
        }

        [Theory]
        [InlineData(0, 10)]
        [InlineData(1000, 1)]
        public void GetCBDSimulator_ReturnsBadRequest_WhenQueryIsInvalid(double value, int months)
        {
            // Act
            var result = _controller.GetCBDSimulator(value, months);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void GetCBDSimulator_ReturnsOk_WhenQueryIsValid()
        {
            // Arrange
            var value = 1000;
            var months = 10;
            var dto = new CDBSimulatorDTO { Value = value, Months = months };

            _mockService.Setup(s => s.SimulateInvestment(It.IsAny<CDBSimulatorDTO>())).Returns(dto);

            // Act
            var result = _controller.GetCBDSimulator(value, months);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(dto, okResult.Value);
        }

        [Fact]
        public void GetCBDSimulator_ReturnsInternalServerError_WhenExceptionIsThrown()
        {
            // Arrange
            var value = 1000;
            var months = 10;

            _mockService.Setup(s => s.SimulateInvestment(It.IsAny<CDBSimulatorDTO>())).Throws(new Exception());

            // Act
            var result = _controller.GetCBDSimulator(value, months);

            // Assert
            var statusCodeResult = Assert.IsType<StatusCodeResult>(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, statusCodeResult.StatusCode);
        }
    }
}
