using CDBInvestmentDomain.Models;

namespace CDBInvestmentService.Interfaces
{
    public interface ICDBSimulatorService
    {
        public CDBSimulatorDTO SimulateInvestment(CDBSimulatorDTO dto);
    }
}
