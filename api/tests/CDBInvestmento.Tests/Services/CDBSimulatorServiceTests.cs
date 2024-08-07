using CDBInvestmentDomain.Models;
using CDBInvestmentService.Services;

namespace CDBInvestmentApi.Tests
{
    public class CDBSimulatorServiceTests
    {
        private readonly CDBSimulatorService _service;

        public CDBSimulatorServiceTests()
        {
            _service = new CDBSimulatorService();
        }

        [Theory]
        [InlineData(1000, 2, 2029.25)]
        [InlineData(1000, 6, 6207.46)]
        [InlineData(1000, 12, 12785.85)]
        public void SimulateInvestment_CalculatesGrossValueCorrectly(double value, int months, double expectedGrossValue)
        {
            // Arrange
            var dto = new CDBSimulatorDTO { Value = value, Months = months };

            // Act
            var result = _service.SimulateInvestment(dto);

            // Assert
            Assert.Equal(expectedGrossValue, result.GrossValue, 2);
        }

        [Theory]
        [InlineData(1000, 6, 6160.78)]
        [InlineData(1000, 12, 12628.68)]
        [InlineData(1000, 24, 26594.96)]
        [InlineData(1000, 30, 34228.71)]
        public void SimulateInvestment_CalculatesNetValueCorrectly(double value, int months, double expectedNetValue)
        {
            // Arrange
            var dto = new CDBSimulatorDTO { Value = value, Months = months };

            // Act
            var result = _service.SimulateInvestment(dto);

            // Assert
            Assert.Equal(expectedNetValue, result.NetValue, 2);
        }
    }
}
