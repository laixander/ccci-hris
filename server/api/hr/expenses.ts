import type { Reimbursement } from '~~/app/types'

export default defineEventHandler((): Reimbursement[] => {
  return [
    {
      id: 1,
      dateApplied: 'September 5, 2026 at 09:00 AM',
      dateOfExpense: 'September 4, 2026',
      category: 'Meals',
      merchant: 'Jollibee Foods Corp.',
      merchantAddress: 'G/F., Rufino Tower Bldg., 6784 Ayala Cor. V.A. Rufino St., San Lorenzo, City of Makati NCR. Fourth District',
      merchantTIN: '006-975-387-000',
      amount: '₱850.00',
      status: 'PENDING',
      employeeName: 'John Doe',
      employeeAvatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=JohnDoe'
    },
    {
      id: 2,
      dateApplied: 'September 3, 2026 at 02:15 PM',
      dateOfExpense: 'September 2, 2026',
      category: 'Transportation',
      merchant: 'Grab Philippines',
      merchantAddress: '12th Floor, Wilcon IT Hub, 2251 Chino Roces Ave, Makati, 1233 Metro Manila',
      merchantTIN: '008-874-124-000',
      amount: '₱320.00',
      status: 'APPROVED',
      employeeName: 'Jane Smith',
      employeeAvatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=JaneSmith'
    },
    {
      id: 3,
      dateApplied: 'August 28, 2026 at 10:45 AM',
      dateOfExpense: 'August 27, 2026',
      category: 'Office Supplies',
      merchant: 'National Bookstore',
      merchantAddress: 'Quad Alpha Centrum Bldg., 125 Pioneer St, Mandaluyong, 1550 Metro Manila',
      merchantTIN: '000-098-999-000',
      amount: '₱1,200.00',
      status: 'APPROVED',
      employeeName: 'Alice Johnson',
      employeeAvatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=AliceJohnson'
    },
    {
      id: 4,
      dateApplied: 'August 20, 2026 at 08:30 AM',
      dateOfExpense: 'August 19, 2026',
      category: 'Travel',
      merchant: 'Philippine Airlines',
      merchantAddress: 'PNB Financial Center, CCP Complex, Macapagal Avenue, Pasay City',
      merchantTIN: '000-059-865-000',
      amount: '₱5,400.00',
      status: 'APPROVED',
      employeeName: 'Bob Williams',
      employeeAvatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=BobWilliams'
    },
    {
      id: 5,
      dateApplied: 'August 15, 2026 at 03:00 PM',
      dateOfExpense: 'August 14, 2026',
      category: 'Meals',
      merchant: 'SM Food Court',
      merchantAddress: 'SM Megamall, EDSA corner Doña Julia Vargas Ave., Ortigas Center, Mandaluyong',
      merchantTIN: '000-111-222-000',
      amount: '₱640.00',
      status: 'DECLINED',
      employeeName: 'John Doe',
      employeeAvatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=JohnDoe'
    },
    {
      id: 6,
      dateApplied: 'August 10, 2026 at 11:20 AM',
      dateOfExpense: 'August 9, 2026',
      category: 'Transportation',
      merchant: 'Meralco Metered Taxi',
      merchantAddress: '1540 Taft Ave, Ermita, Manila, 1000 Metro Manila',
      merchantTIN: '002-333-444-000',
      amount: '₱180.00',
      status: 'APPROVED',
      employeeName: 'Jane Smith',
      employeeAvatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=JaneSmith'
    },
    {
      id: 7,
      dateApplied: 'July 30, 2026 at 09:55 AM',
      dateOfExpense: 'July 29, 2026',
      category: 'Others',
      merchant: 'Mercury Drug',
      merchantAddress: '7 Mercury Ave, Bagumbayan, Quezon City, 1110 Metro Manila',
      merchantTIN: '000-456-789-000',
      amount: '₱450.00',
      status: 'PENDING',
      employeeName: 'Alice Johnson',
      employeeAvatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=AliceJohnson'
    },
    {
      id: 8,
      dateApplied: 'July 22, 2026 at 04:10 PM',
      dateOfExpense: 'July 21, 2026',
      category: 'Meals',
      merchant: 'Mang Inasal',
      merchantAddress: 'SM City North EDSA, Bago Bantay, Quezon City',
      merchantTIN: '004-567-890-000',
      amount: '₱390.00',
      status: 'APPROVED',
      employeeName: 'Bob Williams',
      employeeAvatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=BobWilliams'
    },
  ]
})
