using CDBInvestmentDomain.Queries;

namespace CDBInvestmentDomain.Models
{
    public class CDBSimulatorDTO
    {
        public double Value { get; set; }
        public int Months { get; set; }
        public double GrossValue { get; set; }
        public double NetValue { get; set; }
    }
}
