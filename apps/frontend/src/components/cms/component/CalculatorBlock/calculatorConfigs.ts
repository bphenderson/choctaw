export type CalculatorInput = {
  name: string;
  label: string;
  type: 'number' | 'select';
  default: string | number;
  options?: string[];
};

export type CalculatorConfig = {
  label: string;
  inputs: CalculatorInput[];
  calculate: (data: Record<string, string | number>) => string;
  explanation: string;
};

export const calculatorConfigs: Record<string, CalculatorConfig> = {
  cd: {
    label: 'Certificate of Deposit (CD)',
    inputs: [
      { name: 'principal', label: 'Initial Deposit ($)', type: 'number', default: 10000 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 5 },
      { name: 'years', label: 'Term (Years)', type: 'number', default: 5 },
      { name: 'compound', label: 'Compound Frequency', type: 'select', options: ['Monthly', 'Quarterly', 'Annually'], default: 'Monthly' },
    ],
    calculate: ({ principal, rate, years, compound }) => {
      const n = compound === 'Monthly' ? 12 : compound === 'Quarterly' ? 4 : 1;
      const amount = Number(principal) * Math.pow(1 + Number(rate) / 100 / n, n * Number(years));
      return `Future Value: $${amount.toFixed(2)}`;
    },
    explanation: 'Calculates the future value of a Certificate of Deposit based on the initial deposit, interest rate, term, and compounding frequency.',
  },
  retirement: {
    label: 'Retirement Savings',
    inputs: [
      { name: 'currentSavings', label: 'Current Savings ($)', type: 'number', default: 50000 },
      { name: 'monthlyContribution', label: 'Monthly Contribution ($)', type: 'number', default: 500 },
      { name: 'years', label: 'Years to Retirement', type: 'number', default: 20 },
      { name: 'rate', label: 'Annual Return Rate (%)', type: 'number', default: 7 },
    ],
    calculate: ({ currentSavings, monthlyContribution, years, rate }) => {
      const monthlyRate = Number(rate) / 100 / 12;
      const months = Number(years) * 12;
      const futureValueSavings = Number(currentSavings) * Math.pow(1 + monthlyRate, months);
      const futureValueContributions =
        Number(monthlyContribution) * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      const total = futureValueSavings + futureValueContributions;
      return `Retirement Savings: $${total.toFixed(2)}`;
    },
    explanation: 'Estimates the future value of retirement savings based on current savings, monthly contributions, years until retirement, and expected return rate.',
  },
  creditCardPayoff: {
    label: 'Credit Card Payoff',
    inputs: [
      { name: 'balance', label: 'Current Balance ($)', type: 'number', default: 5000 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 18 },
      { name: 'monthlyPayment', label: 'Monthly Payment ($)', type: 'number', default: 200 },
    ],
    calculate: ({ balance, rate, monthlyPayment }) => {
      const monthlyRate = Number(rate) / 100 / 12;
      const months = Math.ceil(
        Math.log(Number(monthlyPayment) / (Number(monthlyPayment) - Number(balance) * monthlyRate)) /
        Math.log(1 + monthlyRate)
      );
      const totalPaid = Number(monthlyPayment) * months;
      return `Payoff Time: ${months} months, Total Paid: $${totalPaid.toFixed(2)}`;
    },
    explanation: 'Determines the time and total cost to pay off a credit card balance based on the current balance, interest rate, and monthly payment amount.',
  },
  savingsGoal: {
    label: 'Savings Goal',
    inputs: [
      { name: 'goal', label: 'Savings Goal ($)', type: 'number', default: 20000 },
      { name: 'currentSavings', label: 'Current Savings ($)', type: 'number', default: 5000 },
      { name: 'monthlyContribution', label: 'Monthly Contribution ($)', type: 'number', default: 300 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 4 },
    ],
    calculate: ({ goal, currentSavings, monthlyContribution, rate }) => {
      const monthlyRate = Number(rate) / 100 / 12;
      let months = 0;
      let current = Number(currentSavings);
      while (current < Number(goal) && months < 1200) {
        current = current * (1 + monthlyRate) + Number(monthlyContribution);
        months++;
      }
      return months < 1200
        ? `Time to Goal: ${months} months`
        : 'Goal not reachable within 100 years';
    },
    explanation: 'Calculates the time required to reach a savings goal based on current savings, monthly contributions, and interest rate.',
  },
  commercialLoan: {
    label: 'Commercial Loan',
    inputs: [
      { name: 'principal', label: 'Loan Amount ($)', type: 'number', default: 500000 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 6 },
      { name: 'years', label: 'Loan Term (Years)', type: 'number', default: 10 },
    ],
    calculate: ({ principal, rate, years }) => {
      const monthlyRate = Number(rate) / 100 / 12;
      const months = Number(years) * 12;
      const monthlyPayment =
        (Number(principal) * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalPaid = monthlyPayment * months;
      return `Monthly Payment: $${monthlyPayment.toFixed(2)}, Total Paid: $${totalPaid.toFixed(2)}`;
    },
    explanation: 'Computes the monthly payment and total cost for a commercial loan based on the loan amount, interest rate, and term.',
  },
  loanAmortization: {
    label: 'Loan Amortization',
    inputs: [
      { name: 'principal', label: 'Loan Amount ($)', type: 'number', default: 200000 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 5 },
      { name: 'years', label: 'Loan Term (Years)', type: 'number', default: 30 },
    ],
    calculate: ({ principal, rate, years }) => {
      const monthlyRate = Number(rate) / 100 / 12;
      const months = Number(years) * 12;
      const monthlyPayment =
        (Number(principal) * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalPaid = monthlyPayment * months;
      return `Monthly Payment: $${monthlyPayment.toFixed(2)}, Total Paid: $${totalPaid.toFixed(2)}`;
    },
    explanation: 'Calculates the monthly payment and total cost for any loan, such as a mortgage, based on the loan amount, interest rate, and term.',
  },
  rentVsBuy: {
    label: 'Rent vs. Buy',
    inputs: [
      { name: 'homePrice', label: 'Home Price ($)', type: 'number', default: 300000 },
      { name: 'downPayment', label: 'Down Payment ($)', type: 'number', default: 60000 },
      { name: 'mortgageRate', label: 'Mortgage Rate (%)', type: 'number', default: 4 },
      { name: 'loanTerm', label: 'Loan Term (Years)', type: 'number', default: 30 },
      { name: 'monthlyRent', label: 'Monthly Rent ($)', type: 'number', default: 1500 },
      { name: 'years', label: 'Years to Compare', type: 'number', default: 10 },
    ],
    calculate: ({ homePrice, downPayment, mortgageRate, loanTerm, monthlyRent, years }) => {
      const loanAmount = Number(homePrice) - Number(downPayment);
      const monthlyRate = Number(mortgageRate) / 100 / 12;
      const months = Number(loanTerm) * 12;
      const monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalMortgageCost = monthlyPayment * Number(years) * 12 + Number(downPayment);
      const totalRentCost = Number(monthlyRent) * Number(years) * 12;
      return `Buy Cost: $${totalMortgageCost.toFixed(2)}, Rent Cost: $${totalRentCost.toFixed(2)}`;
    },
    explanation: 'Compares the total costs of renting versus buying a home over a specified period, including mortgage payments and down payment.',
  },
  refiBreakEven: {
    label: 'Refinance Break-even',
    inputs: [
      { name: 'currentPayment', label: 'Current Monthly Payment ($)', type: 'number', default: 1200 },
      { name: 'newPayment', label: 'New Monthly Payment ($)', type: 'number', default: 1000 },
      { name: 'closingCosts', label: 'Closing Costs ($)', type: 'number', default: 5000 },
    ],
    calculate: ({ currentPayment, newPayment, closingCosts }) => {
      const monthlySavings = Number(currentPayment) - Number(newPayment);
      const breakEvenMonths = monthlySavings > 0 ? Number(closingCosts) / monthlySavings : Infinity;
      return breakEvenMonths !== Infinity
        ? `Break-even in ${Math.ceil(breakEvenMonths)} months`
        : 'No savings from refinancing';
    },
    explanation: 'Determines the time required to recover refinancing costs based on the difference between current and new monthly payments and closing costs.',
  },
  debtConsolidation: {
    label: 'Debt Consolidation',
    inputs: [
      { name: 'totalDebt', label: 'Total Debt ($)', type: 'number', default: 20000 },
      { name: 'currentRate', label: 'Current Average Interest Rate (%)', type: 'number', default: 15 },
      { name: 'newRate', label: 'New Loan Interest Rate (%)', type: 'number', default: 7 },
      { name: 'loanTerm', label: 'New Loan Term (Years)', type: 'number', default: 5 },
    ],
    calculate: ({ totalDebt, currentRate, newRate, loanTerm }) => {
      const monthlyRateCurrent = Number(currentRate) / 100 / 12;
      const monthlyRateNew = Number(newRate) / 100 / 12;
      const months = Number(loanTerm) * 12;
      const currentPayment = (Number(totalDebt) * monthlyRateCurrent) / (1 - Math.pow(1 + monthlyRateCurrent, -months));
      const newPayment = (Number(totalDebt) * monthlyRateNew) / (1 - Math.pow(1 + monthlyRateNew, -months));
      const totalSavings = (currentPayment - newPayment) * months;
      return `New Monthly Payment: $${newPayment.toFixed(2)}, Total Savings: $${totalSavings.toFixed(2)}`;
    },
    explanation: 'Compares current debt payments to a consolidated loan, showing the new monthly payment and total savings.',
  },
  prepaymentSavings: {
    label: 'Prepayment Savings',
    inputs: [
      { name: 'principal', label: 'Loan Amount ($)', type: 'number', default: 200000 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 5 },
      { name: 'years', label: 'Loan Term (Years)', type: 'number', default: 30 },
      { name: 'extraPayment', label: 'Extra Monthly Payment ($)', type: 'number', default: 200 },
    ],
    calculate: ({ principal, rate, years, extraPayment }) => {
      const monthlyRate = Number(rate) / 100 / 12;
      const months = Number(years) * 12;
      const monthlyPayment =
        (Number(principal) * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      let remainingBalance = Number(principal);
      let monthsWithExtra = 0;
      while (remainingBalance > 0 && monthsWithExtra < months) {
        const interest = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment + Number(extraPayment) - interest;
        remainingBalance -= principalPayment;
        monthsWithExtra++;
      }
      const totalPaidWithoutExtra = monthlyPayment * months;
      const totalPaidWithExtra = (monthlyPayment + Number(extraPayment)) * monthsWithExtra;
      const savings = totalPaidWithoutExtra - totalPaidWithExtra;
      return `Months Saved: ${months - monthsWithExtra}, Interest Saved: $${savings.toFixed(2)}`;
    },
    explanation: 'Calculates the interest savings and time saved by making extra payments on a loan.',
  },
  earlyPayoff: {
    label: 'Early Payoff',
    inputs: [
      { name: 'balance', label: 'Current Loan Balance ($)', type: 'number', default: 150000 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 5 },
      { name: 'monthlyPayment', label: 'Current Monthly Payment ($)', type: 'number', default: 1000 },
      { name: 'extraPayment', label: 'Extra Monthly Payment ($)', type: 'number', default: 200 },
    ],
    calculate: ({ balance, rate, monthlyPayment, extraPayment }) => {
      const monthlyRate = Number(rate) / 100 / 12;
      let remainingBalance = Number(balance);
      let months = 0;
      while (remainingBalance > 0 && months < 1200) {
        const interest = remainingBalance * monthlyRate;
        const principalPayment = Number(monthlyPayment) + Number(extraPayment) - interest;
        remainingBalance -= principalPayment;
        months++;
      }
      return months < 1200
        ? `Payoff Time: ${months} months`
        : 'Payoff not possible within 100 years';
    },
    explanation: 'Estimates the time required to pay off a loan by making extra monthly payments.',
  },
  iraToRoth: {
    label: 'IRA to Roth Conversion',
    inputs: [
      { name: 'iraBalance', label: 'Traditional IRA Balance ($)', type: 'number', default: 100000 },
      { name: 'taxRate', label: 'Current Tax Rate (%)', type: 'number', default: 25 },
      { name: 'years', label: 'Years Until Withdrawal', type: 'number', default: 20 },
      { name: 'growthRate', label: 'Annual Growth Rate (%)', type: 'number', default: 6 },
    ],
    calculate: ({ iraBalance, taxRate, years, growthRate }) => {
      const taxCost = Number(iraBalance) * (Number(taxRate) / 100);
      const rothBalance = Number(iraBalance) - taxCost;
      const futureValue = rothBalance * Math.pow(1 + Number(growthRate) / 100, Number(years));
      return `Tax Cost: $${taxCost.toFixed(2)}, Future Roth Value: $${futureValue.toFixed(2)}`;
    },
    explanation: 'Calculates the tax cost and future value of converting a traditional IRA to a Roth IRA, considering tax rate and growth rate.',
  },
  iraContribution: {
    label: 'IRA Contribution',
    inputs: [
      { name: 'annualContribution', label: 'Annual Contribution ($)', type: 'number', default: 6000 },
      { name: 'years', label: 'Years to Contribute', type: 'number', default: 30 },
      { name: 'rate', label: 'Annual Return Rate (%)', type: 'number', default: 7 },
    ],
    calculate: ({ annualContribution, years, rate }) => {
      const annualRate = Number(rate) / 100;
      const futureValue =
        Number(annualContribution) * ((Math.pow(1 + annualRate, Number(years)) - 1) / annualRate);
      return `Future IRA Value: $${futureValue.toFixed(2)}`;
    },
    explanation: 'Estimates the future value of an IRA based on annual contributions, years of contribution, and expected return rate.',
  },
  autoPayment: {
    label: 'Auto Payment',
    inputs: [
      { name: 'loanAmount', label: 'Loan Amount ($)', type: 'number', default: 30000 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 4.5 },
      { name: 'years', label: 'Loan Term (Years)', type: 'number', default: 5 },
    ],
    calculate: ({ loanAmount, rate, years }) => {
      const monthlyRate = Number(rate) / 100 / 12;
      const months = Number(years) * 12;
      const monthlyPayment =
        (Number(loanAmount) * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalPaid = monthlyPayment * months;
      return `Monthly Payment: $${monthlyPayment.toFixed(2)}, Total Paid: $${totalPaid.toFixed(2)}`;
    },
    explanation: 'Computes the monthly payment and total cost for an auto loan based on the loan amount, interest rate, and term.',
  },
  autoPurchase: {
    label: 'Auto Purchase',
    inputs: [
      { name: 'carPrice', label: 'Car Price ($)', type: 'number', default: 35000 },
      { name: 'downPayment', label: 'Down Payment ($)', type: 'number', default: 5000 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 4.5 },
      { name: 'years', label: 'Loan Term (Years)', type: 'number', default: 5 },
    ],
    calculate: ({ carPrice, downPayment, rate, years }) => {
      const loanAmount = Number(carPrice) - Number(downPayment);
      const monthlyRate = Number(rate) / 100 / 12;
      const months = Number(years) * 12;
      const monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalPaid = monthlyPayment * months + Number(downPayment);
      return `Monthly Payment: $${monthlyPayment.toFixed(2)}, Total Cost: $${totalPaid.toFixed(2)}`;
    },
    explanation: 'Calculates the monthly payment and total cost for purchasing a car, including the down payment, loan amount, interest rate, and term.',
  },
  autoRefinancing: {
    label: 'Auto Refinancing',
    inputs: [
      { name: 'currentBalance', label: 'Current Loan Balance ($)', type: 'number', default: 20000 },
      { name: 'currentRate', label: 'Current Interest Rate (%)', type: 'number', default: 6 },
      { name: 'newRate', label: 'New Interest Rate (%)', type: 'number', default: 3.5 },
      { name: 'years', label: 'New Loan Term (Years)', type: 'number', default: 4 },
    ],
    calculate: ({ currentBalance, currentRate, newRate, years }) => {
      const monthlyRateCurrent = Number(currentRate) / 100 / 12;
      const monthlyRateNew = Number(newRate) / 100 / 12;
      const months = Number(years) * 12;
      const currentPayment = (Number(currentBalance) * monthlyRateCurrent) / (1 - Math.pow(1 + monthlyRateCurrent, -months));
      const newPayment = (Number(currentBalance) * monthlyRateNew) / (1 - Math.pow(1 + monthlyRateNew, -months));
      const totalSavings = (currentPayment - newPayment) * months;
      return `New Monthly Payment: $${newPayment.toFixed(2)}, Total Savings: $${totalSavings.toFixed(2)}`;
    },
    explanation: 'Compares current and new auto loan payments to show potential savings from refinancing, based on the current balance, current and new interest rates, and new loan term.',
  },
  helocVsMotorcycle: {
    label: 'HELOC vs. Motorcycle Loan',
    inputs: [
      { name: 'loanAmount', label: 'Loan Amount ($)', type: 'number', default: 15000 },
      { name: 'helocRate', label: 'HELOC Interest Rate (%)', type: 'number', default: 7 },
      { name: 'motorcycleRate', label: 'Motorcycle Loan Rate (%)', type: 'number', default: 5 },
      { name: 'years', label: 'Loan Term (Years)', type: 'number', default: 3 },
    ],
    calculate: ({ loanAmount, helocRate, motorcycleRate, years }) => {
      const monthlyRateHeloc = Number(helocRate) / 100 / 12;
      const monthlyRateMotorcycle = Number(motorcycleRate) / 100 / 12;
      const months = Number(years) * 12;
      const helocPayment =
        (Number(loanAmount) * monthlyRateHeloc * Math.pow(1 + monthlyRateHeloc, months)) /
        (Math.pow(1 + monthlyRateHeloc, months) - 1);
      const motorcyclePayment =
        (Number(loanAmount) * monthlyRateMotorcycle * Math.pow(1 + monthlyRateMotorcycle, months)) /
        (Math.pow(1 + monthlyRateMotorcycle, months) - 1);
      const helocTotal = helocPayment * months;
      const motorcycleTotal = motorcyclePayment * months;
      return `HELOC Monthly: $${helocPayment.toFixed(2)}, Total: $${helocTotal.toFixed(2)}; Motorcycle Monthly: $${motorcyclePayment.toFixed(2)}, Total: $${motorcycleTotal.toFixed(2)}`;
    },
    explanation: 'Compares the monthly and total costs of financing a motorcycle using a Home Equity Line of Credit (HELOC) versus a dedicated motorcycle loan.',
  },
  motorcyclePayment: {
    label: 'Motorcycle Payment',
    inputs: [
      { name: 'loanAmount', label: 'Loan Amount ($)', type: 'number', default: 15000 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 5 },
      { name: 'years', label: 'Loan Term (Years)', type: 'number', default: 3 },
    ],
    calculate: ({ loanAmount, rate, years }) => {
      const monthlyRate = Number(rate) / 100 / 12;
      const months = Number(years) * 12;
      const monthlyPayment =
        (Number(loanAmount) * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalPaid = monthlyPayment * months;
      return `Monthly Payment: $${monthlyPayment.toFixed(2)}, Total Paid: $${totalPaid.toFixed(2)}`;
    },
    explanation: 'Computes the monthly payment and total cost for a motorcycle loan based on the loan amount, interest rate, and term.',
  },
  boatPayment: {
    label: 'Boat Payment',
    inputs: [
      { name: 'loanAmount', label: 'Loan Amount ($)', type: 'number', default: 50000 },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', default: 5.5 },
      { name: 'years', label: 'Loan Term (Years)', type: 'number', default: 7 },
    ],
    calculate: ({ loanAmount, rate, years }) => {
      const monthlyRate = Number(rate) / 100 / 12;
      const months = Number(years) * 12;
      const monthlyPayment =
        (Number(loanAmount) * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalPaid = monthlyPayment * months;
      return `Monthly Payment: $${monthlyPayment.toFixed(2)}, Total Paid: $${totalPaid.toFixed(2)}`;
    },
    explanation: 'Computes the monthly payment and total cost for a boat loan based on the loan amount, interest rate, and term.',
  },
  helocVsBoat: {
    label: 'HELOC vs. Boat Loan',
    inputs: [
      { name: 'loanAmount', label: 'Loan Amount ($)', type: 'number', default: 50000 },
      { name: 'helocRate', label: 'HELOC Interest Rate (%)', type: 'number', default: 7 },
      { name: 'boatRate', label: 'Boat Loan Rate (%)', type: 'number', default: 5.5 },
      { name: 'years', label: 'Loan Term (Years)', type: 'number', default: 7 },
    ],
    calculate: ({ loanAmount, helocRate, boatRate, years }) => {
      const monthlyRateHeloc = Number(helocRate) / 100 / 12;
      const monthlyRateBoat = Number(boatRate) / 100 / 12;
      const months = Number(years) * 12;
      const helocPayment =
        (Number(loanAmount) * monthlyRateHeloc * Math.pow(1 + monthlyRateHeloc, months)) /
        (Math.pow(1 + monthlyRateHeloc, months) - 1);
      const boatPayment =
        (Number(loanAmount) * monthlyRateBoat * Math.pow(1 + monthlyRateBoat, months)) /
        (Math.pow(1 + monthlyRateBoat, months) - 1);
      const helocTotal = helocPayment * months;
      const boatTotal = boatPayment * months;
      return `HELOC Monthly: $${helocPayment.toFixed(2)}, Total: $${helocTotal.toFixed(2)}; Boat Loan Monthly: $${boatPayment.toFixed(2)}, Total: $${boatTotal.toFixed(2)}`;
    },
    explanation: 'Compares the monthly and total costs of financing a boat using a Home Equity Line of Credit (HELOC) versus a dedicated boat loan.',
  },
  armVsFixed: {
    label: 'ARM vs. Fixed Rate Mortgage',
    inputs: [
      { name: 'loanAmount', label: 'Loan Amount ($)', type: 'number', default: 250000 },
      { name: 'fixedRate', label: 'Fixed Rate (%)', type: 'number', default: 4.5 },
      { name: 'armRate', label: 'ARM Initial Rate (%)', type: 'number', default: 3.5 },
      { name: 'armAdjustment', label: 'ARM Rate Adjustment (%)', type: 'number', default: 2 },
      { name: 'years', label: 'Loan Term (Years)', type: 'number', default: 30 },
    ],
    calculate: ({ loanAmount, fixedRate, armRate, armAdjustment, years }) => {
      const monthlyRateFixed = Number(fixedRate) / 100 / 12;
      const monthlyRateArm = (Number(armRate) + Number(armAdjustment)) / 100 / 12;
      const months = Number(years) * 12;
      const fixedPayment =
        (Number(loanAmount) * monthlyRateFixed * Math.pow(1 + monthlyRateFixed, months)) /
        (Math.pow(1 + monthlyRateFixed, months) - 1);
      const armPayment =
        (Number(loanAmount) * monthlyRateArm * Math.pow(1 + monthlyRateArm, months)) /
        (Math.pow(1 + monthlyRateArm, months) - 1);
      const fixedTotal = fixedPayment * months;
      const armTotal = armPayment * months;
      return `Fixed Monthly: $${fixedPayment.toFixed(2)}, Total: $${fixedTotal.toFixed(2)}; ARM Monthly: $${armPayment.toFixed(2)}, Total: $${armTotal.toFixed(2)}`;
    },
    explanation: 'Compares the monthly and total costs of an adjustable-rate mortgage (ARM) versus a fixed-rate mortgage, considering initial and adjusted rates.',
  },
  arm: {
    label: '5/7/10 Year ARM',
    inputs: [
      { name: 'loanAmount', label: 'Loan Amount ($)', type: 'number', default: 250000 },
      { name: 'initialRate', label: 'Initial Rate (%)', type: 'number', default: 3.5 },
      { name: 'adjustedRate', label: 'Adjusted Rate (%)', type: 'number', default: 5.5 },
      { name: 'initialYears', label: 'Initial Fixed Period', type: 'select', options: ['5', '7', '10'], default: '5' },
      { name: 'totalYears', label: 'Total Loan Term (Years)', type: 'number', default: 30 },
    ],
    calculate: ({ loanAmount, initialRate, adjustedRate, initialYears, totalYears }) => {
      const monthlyRateInitial = Number(initialRate) / 100 / 12;
      const monthlyRateAdjusted = Number(adjustedRate) / 100 / 12;
      const initialMonths = Number(initialYears) * 12;
      const totalMonths = Number(totalYears) * 12;
      const initialPayment =
        (Number(loanAmount) * monthlyRateInitial * Math.pow(1 + monthlyRateInitial, totalMonths)) /
        (Math.pow(1 + monthlyRateInitial, totalMonths) - 1);
      const remainingBalanceAfterInitial = Number(loanAmount);
      const adjustedPayment =
        (remainingBalanceAfterInitial * monthlyRateAdjusted * Math.pow(1 + monthlyRateAdjusted, totalMonths - initialMonths)) /
        (Math.pow(1 + monthlyRateAdjusted, totalMonths - initialMonths) - 1);
      const totalPaid = initialPayment * initialMonths + adjustedPayment * (totalMonths - initialMonths);
      return `Initial Monthly: $${initialPayment.toFixed(2)}, Adjusted Monthly: $${adjustedPayment.toFixed(2)}, Total Paid: $${totalPaid.toFixed(2)}`;
    },
    explanation: 'Calculates payments for an adjustable-rate mortgage (ARM) with a 5, 7, or 10-year fixed period, showing initial and adjusted payments and total cost.',
  },
  collegeSavings: {
    label: 'College Savings',
    inputs: [
      { name: 'goal', label: 'College Savings Goal ($)', type: 'number', default: 100000 },
      { name: 'currentSavings', label: 'Current Savings ($)', type: 'number', default: 10000 },
      { name: 'monthlyContribution', label: 'Monthly Contribution ($)', type: 'number', default: 500 },
      { name: 'years', label: 'Years Until College', type: 'number', default: 18 },
      { name: 'rate', label: 'Annual Return Rate (%)', type: 'number', default: 6 },
    ],
    calculate: ({ goal, currentSavings, monthlyContribution, years, rate }) => {
      const monthlyRate = Number(rate) / 100 / 12;
      const months = Number(years) * 12;
      const futureValueSavings = Number(currentSavings) * Math.pow(1 + monthlyRate, months);
      const futureValueContributions =
        Number(monthlyContribution) * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      const total = futureValueSavings + futureValueContributions;
      return total >= Number(goal)
        ? `Savings: $${total.toFixed(2)}, Goal Met`
        : `Savings: $${total.toFixed(2)}, Shortfall: $${(Number(goal) - total).toFixed(2)}`;
    },
    explanation: 'Estimates savings for college expenses, comparing the total savings to a goal based on current savings, monthly contributions, years until college, and return rate.',
  },
};