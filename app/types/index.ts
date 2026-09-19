export type EmployeeStatus = 'ACTIVE' | 'INACTIVE'

export interface Employee {
  id: number
  name: string
  employeeNo: string
  department: string
  designation: string
  dateHired: string
  employmentType: string
  status: EmployeeStatus
  email: string
}

export interface OrgNode {
  id: string
  parentId: string
  title: string
  icon: string
  employees: number
  avatars: string[]
}

export interface FloatingRole {
  title: string
  icon: string
  employees: number
  avatars: string[]
}

export interface DashboardActivity {
  text: string
  time: string
  icon: string
  color: string
}

export interface AttendanceRecord {
  name: string
  role: string
  time: string
  avatar: string
}

export interface LeaveRecord {
  name: string
  role: string
  leaveType: string
  avatar: string
}

export interface BirthdayRecord {
  name: string
  role: string
  date: string
  avatar: string
}

export interface DashboardData {
  timeInList: AttendanceRecord[]
  timeOutList: AttendanceRecord[]
  recentActivities: DashboardActivity[]
  onLeaveTodayList: LeaveRecord[]
  upcomingLeaveList: LeaveRecord[]
  birthdaysTodayList: BirthdayRecord[]
  upcomingBirthdaysList: BirthdayRecord[]
}

export interface KPI {
  label: string
  icon: string
  color: string
  bg: string
  value: string
  sublabel: string
}

export interface LeaveRequest {
  id: number
  dateApplied: string
  type: string
  start: string
  end: string
  duration: string
  status: string
  approvers: { src: string }[]
}

export interface LedgerEntry {
  date: string
  leaveType: string
  credit: number | null
  debit: number | null
  balance: number
  entryBy: string
  avatar: string
}

export interface LeavesData {
  kpis: KPI[]
  leaves: LeaveRequest[]
  ledger: LedgerEntry[]
}
export interface OvertimeRequest {
  id: number
  dateApplied: string
  date: string
  start: string
  end: string
  duration: string
  status: string
}

export interface Earnings {
  basicSalary: number
  overtime: number
  overtimeHours: number
}

export interface DeductionBreakdown {
  sss: number
  philhealth: number
  pagibig: number
  late: number
  lateHours: number
  undertime: number
  undertimeHours: number
  lwop: number
  lwopHours: number
  incomeTax: number
}

export interface Payslip {
  id: number
  date: string
  cutoffPeriod: string
  grossPay: number
  allowances: number
  deductions: number
  netPay: number
  status: string
  earnings: Earnings
  deductionBreakdown: DeductionBreakdown
}

export interface Reimbursement {
  id: number
  dateApplied: string
  dateOfExpense: string
  category: string
  merchant: string
  amount: string
  status: string
}

export interface OKR {
  id: number
  title: string
  progress: number
  status: string
  color: string
}

export interface Feedback {
  id: number
  author: string
  role: string
  rating: string
  comment: string
}

export interface PerformanceData {
  radar: {
    selfEvaluation: number[]
    managerEvaluation: number[]
  }
  historical: {
    yourScore: number[]
    companyAverage: number[]
  }
  okrs: OKR[]
  feedbackList: Feedback[]
}

export interface TimesheetRecord {
  day: number
  timeIn: string | null
  timeOut: string | null
  duration: number
  status: 'PRESENT' | 'HOLIDAY' | 'WEEKEND' | 'LWOP' | 'ON LEAVE'
  overtime: number
  late: number
  undertime: number
  leave: number
  lwop: number
}

export interface EvaluationRecord {
  cutoffPeriod: string
  confirmedDate: string
  status: 'PENDING' | 'CONFIRMED'
}

export interface EvaluationsData {
  timesheet: TimesheetRecord[]
  evaluations: EvaluationRecord[]
}

export interface OnboardingTask {
  id: number
  name: string
  description: string
  category: string
  assignee: string
  dueDays: number
  required: boolean
}

export interface OnboardingTemplate {
  id: number
  name: string
  description: string
  status: 'DRAFT' | 'PUBLISHED'
  tasks: OnboardingTask[]
  dateCreated: string
  dateUpdated?: string
}

export type LogCategory = 'time' | 'leave' | 'login' | 'overtime' | 'profile' | 'system' | 'approval' | 'all'

export interface LogActivity {
  id: number
  category: LogCategory
  text: string
  description: string
  datetime: string
  icon: string
  color: string
  bg: string
  unread?: boolean
}

export interface ServiceRequest {
  id: number
  dateApplied: string
  requestType: string
  remarks: string
  status: string
  lastUpdatedBy: string
  lastUpdate: string
}

export interface TimeAdjustmentRecord {
  dateApplied: string
  date: string
  currentTimeIn: string
  currentTimeOut: string
  timeIn: string
  timeOut: string
  duration: number
  status: string
}

export interface BaseApprovalRequest {
  id: number
  requestType: 'leave' | 'overtime' | 'adjustment'
  employee: { name: string, avatar: string, role: string }
  type: string
  reason: string
  dateApplied: string
  status: string
  approvers: { role: string, name: string, status: string, avatar: string }[]
  timeline: { title: string, description: string, date: string, icon: string, color: string, avatar: string }[]
}

export interface LeaveApprovalRequest extends BaseApprovalRequest {
  requestType: 'leave'
  scheduleType: string
  startDate: string
  endDate: string
  duration: string
}

export interface OvertimeApprovalRequest extends BaseApprovalRequest {
  requestType: 'overtime'
  date: string
  timeStart: string
  timeEnd: string
  duration: string
}

export interface AdjustmentApprovalRequest extends BaseApprovalRequest {
  requestType: 'adjustment'
  date: string
  currentTimeStart: string
  currentTimeEnd: string
  timeStart: string
  timeEnd: string
  duration: string
}

export type ApprovalRequest = LeaveApprovalRequest | OvertimeApprovalRequest | AdjustmentApprovalRequest

export interface OnboardingRecord {
  id: number
  employee: string
  role: string
  template: string
  status: string
  progress: number
  startDate: string
}

export interface Asset {
  id: number
  assetTag: string
  name: string
  category: string
  brandModel: string
  purchased: string
  cost: number
  status: 'AVAILABLE' | 'ASSIGNED' | 'MAINTENANCE' | 'BROKEN' | 'UNDER REPAIR' | 'RETIRED'
  location: string
}
