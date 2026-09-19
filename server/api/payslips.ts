import type { Payslip } from '~~/app/types'

export default defineEventHandler((): Payslip[] => {
  return [
    {
      id: 1,
      date: 'August 28, 2026',
      cutoffPeriod: 'August 14, 2026 – August 27, 2026',
      grossPay: 8000,
      allowances: 1500,
      deductions: 660,
      netPay: 7340,
      status: 'APPROVED',
      earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
      deductionBreakdown: { sss: 360, philhealth: 200, pagibig: 100, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
      id: 2,
      date: 'August 14, 2026',
      cutoffPeriod: 'July 31, 2026 – August 13, 2026',
      grossPay: 8000,
      allowances: 0,
      deductions: 0,
      netPay: 8000,
      status: 'APPROVED',
      earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
      deductionBreakdown: { sss: 0, philhealth: 0, pagibig: 0, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
      id: 3,
      date: 'July 31, 2026',
      cutoffPeriod: 'July 15, 2026 – July 30, 2026',
      grossPay: 8000,
      allowances: 1500,
      deductions: 660,
      netPay: 7340,
      status: 'APPROVED',
      earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
      deductionBreakdown: { sss: 360, philhealth: 200, pagibig: 100, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
      id: 4,
      date: 'July 15, 2026',
      cutoffPeriod: 'June 30, 2026 – July 14, 2026',
      grossPay: 8000,
      allowances: 0,
      deductions: 0,
      netPay: 8000,
      status: 'APPROVED',
      earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
      deductionBreakdown: { sss: 0, philhealth: 0, pagibig: 0, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
      id: 5,
      date: 'June 30, 2026',
      cutoffPeriod: 'June 15, 2026 – June 29, 2026',
      grossPay: 8000,
      allowances: 1500,
      deductions: 660,
      netPay: 7340,
      status: 'APPROVED',
      earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
      deductionBreakdown: { sss: 360, philhealth: 200, pagibig: 100, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
      id: 6,
      date: 'June 15, 2026',
      cutoffPeriod: 'May 29, 2026 – June 12, 2026',
      grossPay: 8000,
      allowances: 0,
      deductions: 0,
      netPay: 8000,
      status: 'APPROVED',
      earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
      deductionBreakdown: { sss: 0, philhealth: 0, pagibig: 0, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
      id: 7,
      date: 'May 29, 2026',
      cutoffPeriod: 'May 15, 2026 – May 28, 2026',
      grossPay: 8000,
      allowances: 1500,
      deductions: 660,
      netPay: 7340,
      status: 'APPROVED',
      earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
      deductionBreakdown: { sss: 360, philhealth: 200, pagibig: 100, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
      id: 8,
      date: 'May 15, 2026',
      cutoffPeriod: 'April 30, 2026 – May 14, 2026',
      grossPay: 8000,
      allowances: 0,
      deductions: 0,
      netPay: 8000,
      status: 'APPROVED',
      earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
      deductionBreakdown: { sss: 0, philhealth: 0, pagibig: 0, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    }
  ]
})
