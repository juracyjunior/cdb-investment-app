using CDBInvestmentDomain.Models;
using CDBInvestmentService.Interfaces;

namespace CDBInvestmentService.Services
{
    public class CDBSimulatorService : ICDBSimulatorService
    {
        private const double TB = 1.08;
        private const double CDI = 0.009;
        private const double TAX_6_MONTHS = 0.225;
        private const double TAX_12_MONTHS = 0.2;
        private const double TAX_24_MONTHS = 0.175;
        private const double TAX_OVER_24_MONTHS = 0.15;

        public CDBSimulatorDTO SimulateInvestment(CDBSimulatorDTO dto)
        {
            dto.GrossValue = calculateGrossValue(dto.Value, dto.Months);
            dto.NetValue = calculateNetValue(dto.Value, dto.GrossValue, dto.Months);

            return dto;
        }

        private double calculateGrossValue(double value, int months)
        {
            var finalValue = 0.0;
            var initialValue = value;

            for (var i = 0; i < months; i++)
            {
                finalValue = initialValue * (1 + (CDI * TB));
                initialValue = finalValue + value;
            }

            return finalValue;
        }

        private double calculateNetValue(double initialValue, double grossValue, int months)
        {
            var initialInvestment = initialValue * months;
            var profit = grossValue - initialInvestment;

            if (months <= 6)
                return grossValue - (profit * TAX_6_MONTHS);

            if (months <= 12)
                return grossValue - (profit * TAX_12_MONTHS);

            if (months <= 24)
                return grossValue - (profit * TAX_24_MONTHS);

            return grossValue - (profit * TAX_OVER_24_MONTHS);
        }
    }
}
