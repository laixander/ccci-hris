import type { AssetAssignment, Asset, Employee } from '~/types'

export default eventHandler(async (event) => {
    // Fetch assets and employees from their respective APIs
    const { assets } = await $fetch<{ assets: Asset[] }>('/api/assets')
    const { employees } = await $fetch<{ employees: Employee[] }>('/api/employees')

    const rawAssignments = [
        { id: 1, assetId: 5, employeeId: 1, assignedDate: '07/23/2026', status: 'Active', returnDate: '—' },
        { id: 2, assetId: 4, employeeId: 1, assignedDate: '07/23/2026', status: 'Active', returnDate: '—' },
        { id: 3, assetId: 3, employeeId: 1, assignedDate: '07/23/2026', status: 'Active', returnDate: '—' },
        { id: 4, assetId: 6, employeeId: 2, assignedDate: '07/23/2026', status: 'Active', returnDate: '—' },
        { id: 5, assetId: 9, employeeId: 2, assignedDate: '07/23/2026', status: 'Active', returnDate: '—' },
        { id: 6, assetId: 8, employeeId: 2, assignedDate: '07/23/2026', status: 'Active', returnDate: '—' },
        { id: 7, assetId: 7, employeeId: 2, assignedDate: '07/23/2026', status: 'Returned', returnDate: '08/01/2026' },
        { id: 8, assetId: 11, employeeId: 3, assignedDate: '07/22/2026', status: 'Active', returnDate: '—' },
        { id: 9, assetId: 10, employeeId: 3, assignedDate: '07/22/2026', status: 'Active', returnDate: '—' },
        { id: 10, assetId: 12, employeeId: 4, assignedDate: '07/22/2026', status: 'Active', returnDate: '—' },
        { id: 11, assetId: 1, employeeId: 5, assignedDate: '07/21/2026', status: 'Active', returnDate: '—' },
        { id: 12, assetId: 2, employeeId: 5, assignedDate: '07/21/2026', status: 'Returned', returnDate: '08/10/2026' },
        { id: 13, assetId: 3, employeeId: 6, assignedDate: '07/20/2026', status: 'Active', returnDate: '—' },
        { id: 14, assetId: 4, employeeId: 7, assignedDate: '07/15/2026', status: 'Returned', returnDate: '08/02/2026' },
        { id: 15, assetId: 5, employeeId: 8, assignedDate: '07/12/2026', status: 'Active', returnDate: '—' },
        { id: 16, assetId: 6, employeeId: 9, assignedDate: '07/10/2026', status: 'Active', returnDate: '—' },
        { id: 17, assetId: 7, employeeId: 10, assignedDate: '07/05/2026', status: 'Active', returnDate: '—' },
        { id: 18, assetId: 8, employeeId: 11, assignedDate: '07/02/2026', status: 'Returned', returnDate: '07/20/2026' },
        { id: 19, assetId: 9, employeeId: 12, assignedDate: '06/25/2026', status: 'Active', returnDate: '—' },
        { id: 20, assetId: 10, employeeId: 4, assignedDate: '06/20/2026', status: 'Active', returnDate: '—' },
    ]

    const assignments: AssetAssignment[] = rawAssignments.map(a => {
        const asset = assets.find(as => as.id === a.assetId)
        const employee = employees.find(em => em.id === a.employeeId)

        return {
            id: a.id,
            assetTag: asset?.assetTag || 'Unknown',
            name: asset?.name || 'Unknown',
            category: asset?.category || 'Unknown',
            employee: employee?.name || 'Unknown',
            assignedDate: a.assignedDate,
            status: a.status as 'Active' | 'Returned',
            returnDate: a.returnDate
        }
    })

    return {
        assignments
    }
})
