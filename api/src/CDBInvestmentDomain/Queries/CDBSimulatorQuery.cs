using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CDBInvestmentDomain.Queries
{
    public class CDBSimulatorQuery
    {
        /// <summary>
        /// Valor que será investido a cada mês.
        /// </summary>
        [Required]
        [DisplayName("value")]
        public double Value { get; set; }

        /// <summary>
        /// Meses de investimento.
        /// </summary>
        [Required]
        [DisplayName("months")]
        public int Months { get; set; }
    }
}
