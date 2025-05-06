export function useEMICalculator() {
  const calculateEmi = (principal, annualRate, months) => {
    const monthlyRate = annualRate / 12 / 100;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return emi;
  };

  const calculateAmortizationSchedule = (principal, annualRate, months) => {
    const monthlyRate = annualRate / 12 / 100;
    const emi = calculateEmi(principal, annualRate, months);

    let remainingBalance = principal;
    const schedule = [];

    for (let i = 0; i < months; i++) {
      const interest = remainingBalance * monthlyRate;
      const principalPaid = emi - interest;
      remainingBalance -= principalPaid;

      schedule.push({
        month: i + 1,
        emi,
        principal: principalPaid,
        interest,
        remainingBalance: Math.max(0, remainingBalance),
      });
    }

    return schedule;
  };

  return {
    calculateEmi,
    calculateAmortizationSchedule,
  };
}
