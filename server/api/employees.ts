import type { Employee, OrgNode, FloatingRole } from '~/types'

export default eventHandler(async () => {
    const employees: Employee[] = [
        {
            id: 1,
            name: 'Maria Almeron',
            employeeNo: '1700099724570',
            department: 'Development Department',
            designation: 'Quality Assurance Analyst',
            dateHired: 'November 16, 2023',
            employmentType: 'REGULAR',
            status: 'ACTIVE',
            email: 'malmeron@ccci-tech.com',
        },
        {
            id: 2,
            name: 'Jose Reyes',
            employeeNo: '1700099724571',
            department: 'Development Department',
            designation: 'Software Engineer',
            dateHired: 'March 5, 2022',
            employmentType: 'REGULAR',
            status: 'ACTIVE',
            email: 'jreyes@ccci-tech.com',
        },
        {
            id: 3,
            name: 'Anna Santos',
            employeeNo: '1700099724572',
            department: 'Human Resources',
            designation: 'HR Officer',
            dateHired: 'January 10, 2021',
            employmentType: 'REGULAR',
            status: 'ACTIVE',
            email: 'asantos@ccci-tech.com',
        },
        {
            id: 4,
            name: 'Mark Dela Cruz',
            employeeNo: '1700099724573',
            department: 'Finance',
            designation: 'Accounting Associate',
            dateHired: 'June 20, 2020',
            employmentType: 'REGULAR',
            status: 'INACTIVE',
            email: 'mdelacruz@ccci-tech.com',
        },
        {
            id: 5,
            name: 'Liza Torres',
            employeeNo: '1700099724574',
            department: 'Development Department',
            designation: 'UI/UX Designer',
            dateHired: 'August 1, 2023',
            employmentType: 'PROJECT-BASED',
            status: 'ACTIVE',
            email: 'ltorres@ccci-tech.com',
        },
        {
            id: 6,
            name: 'Carlos Mendoza',
            employeeNo: '1700099724575',
            department: 'Operations',
            designation: 'Operations Supervisor',
            dateHired: 'February 14, 2019',
            employmentType: 'REGULAR',
            status: 'ACTIVE',
            email: 'cmendoza@ccci-tech.com',
        },
        {
            id: 7,
            name: 'Patricia Lim',
            employeeNo: '1700099724576',
            department: 'Development Department',
            designation: 'Backend Developer',
            dateHired: 'September 9, 2022',
            employmentType: 'REGULAR',
            status: 'ACTIVE',
            email: 'plim@ccci-tech.com',
        },
        {
            id: 8,
            name: 'Ronald Garcia',
            employeeNo: '1700099724577',
            department: 'IT Infrastructure',
            designation: 'Systems Administrator',
            dateHired: 'May 3, 2020',
            employmentType: 'REGULAR',
            status: 'INACTIVE',
            email: 'rgarcia@ccci-tech.com',
        },
        {
            id: 9,
            name: 'Sheila Bautista',
            employeeNo: '1700099724578',
            department: 'Human Resources',
            designation: 'Recruitment Specialist',
            dateHired: 'October 22, 2021',
            employmentType: 'REGULAR',
            status: 'ACTIVE',
            email: 'sbautista@ccci-tech.com',
        },
        {
            id: 10,
            name: 'Felix Navarro',
            employeeNo: '1700099724579',
            department: 'Finance',
            designation: 'Payroll Specialist',
            dateHired: 'July 15, 2018',
            employmentType: 'REGULAR',
            status: 'ACTIVE',
            email: 'fnavarro@ccci-tech.com',
        },
        {
            id: 11,
            name: 'Grace Tan',
            employeeNo: '1700099724580',
            department: 'Development Department',
            designation: 'Mobile Developer',
            dateHired: 'April 4, 2024',
            employmentType: 'PROBATIONARY',
            status: 'ACTIVE',
            email: 'gtan@ccci-tech.com',
        },
        {
            id: 12,
            name: 'Dennis Cruz',
            employeeNo: '1700099724581',
            department: 'Operations',
            designation: 'Logistics Coordinator',
            dateHired: 'December 1, 2017',
            employmentType: 'REGULAR',
            status: 'ACTIVE',
            email: 'dcruz@ccci-tech.com',
        },
    ]

    const orgData: OrgNode[] = [
        {
            id: 'ceo',
            parentId: '',
            title: 'Chief Executive Officer',
            icon: 'i-lucide-lock',
            employees: 1,
            avatars: ['CEO']
        },
        {
            id: 'coo',
            parentId: 'ceo',
            title: 'Chief Operating Officer',
            icon: 'i-lucide-lock',
            employees: 1,
            avatars: ['COO']
        },
        {
            id: 'cto',
            parentId: 'coo',
            title: 'Chief Technology Officer',
            icon: 'i-lucide-briefcase',
            employees: 1,
            avatars: ['CTO']
        },
        {
            id: 'hr_admin',
            parentId: 'coo',
            title: 'Senior HR Administrator',
            icon: 'i-lucide-briefcase',
            employees: 1,
            avatars: ['HR_Admin']
        },
        {
            id: 'director',
            parentId: 'cto',
            title: 'Director, Business Solutions, and Development',
            icon: 'i-lucide-briefcase',
            employees: 1,
            avatars: ['Dir']
        },
        {
            id: 'pm',
            parentId: 'cto',
            title: 'Project Manager',
            icon: 'i-lucide-briefcase',
            employees: 1,
            avatars: ['PM']
        },
        {
            id: 'qa_lead',
            parentId: 'director',
            title: 'QA Tester Team Lead',
            icon: 'i-lucide-briefcase',
            employees: 1,
            avatars: ['QA_Lead']
        },
        {
            id: 'ui_lead',
            parentId: 'director',
            title: 'Senior UI/UX Designer',
            icon: 'i-lucide-briefcase',
            employees: 1,
            avatars: ['Sr_UX']
        },
        {
            id: 'dev_lead',
            parentId: 'director',
            title: 'Team Lead Developer',
            icon: 'i-lucide-briefcase',
            employees: 4,
            avatars: ['Dev_Lead1', 'Dev_Lead2', 'Dev_Lead3', 'Dev_Lead4']
        },
        {
            id: 'qa1',
            parentId: 'qa_lead',
            title: 'Quality Assurance Analyst',
            icon: 'i-lucide-briefcase',
            employees: 6,
            avatars: ['QAA1', 'QAA2', 'QAA3', 'QAA4', 'QAAX', 'QAAY']
        },
        {
            id: 'qa2',
            parentId: 'qa_lead',
            title: 'Quality Assurance Analyst',
            icon: 'i-lucide-briefcase',
            employees: 9,
            avatars: ['QAA5', 'QAA6', 'QAA7', 'QAA8', 'QAAX', 'QAAY', 'QAAZ', 'QAAW', 'QAAQ']
        },
        {
            id: 'ui1',
            parentId: 'ui_lead',
            title: 'UI/UX Designer',
            icon: 'i-lucide-briefcase',
            employees: 2,
            avatars: ['UX1', 'UX2']
        },
        {
            id: 'ui2',
            parentId: 'ui_lead',
            title: 'UI/UX Designer',
            icon: 'i-lucide-briefcase',
            employees: 2,
            avatars: ['UX3', 'UX4']
        },
        {
            id: 'sr_dev1',
            parentId: 'dev_lead',
            title: 'Senior Developer',
            icon: 'i-lucide-briefcase',
            employees: 4,
            avatars: ['SD1', 'SD2', 'SD3', 'SD4']
        },
        {
            id: 'sr_dev2',
            parentId: 'sr_dev1',
            title: 'Senior Developer',
            icon: 'i-lucide-briefcase',
            employees: 4,
            avatars: ['SD5', 'SD6', 'SD7', 'SD8']
        },
        {
            id: 'dev',
            parentId: 'sr_dev2',
            title: 'Developer',
            icon: 'i-lucide-briefcase',
            employees: 1,
            avatars: ['D1']
        },
        {
            id: 'jr_dev',
            parentId: 'dev',
            title: 'Jr. Developer',
            icon: 'i-lucide-briefcase',
            employees: 7,
            avatars: ['JD1', 'JD2', 'JD3', 'JD4', 'JD5', 'JD6', 'JD7']
        },
        {
            id: 'taa',
            parentId: 'pm',
            title: 'Technical Admin Assistant',
            icon: 'i-lucide-briefcase',
            employees: 1,
            avatars: ['TAA']
        },
        {
            id: 'hra',
            parentId: 'hr_admin',
            title: 'Human Resource Assistant',
            icon: 'i-lucide-briefcase',
            employees: 1,
            avatars: ['HRA']
        },
        {
            id: 'util',
            parentId: 'hr_admin',
            title: 'Utility / Messenger',
            icon: 'i-lucide-briefcase',
            employees: 1,
            avatars: ['Util']
        }
    ]

    const floatingRoles: FloatingRole[] = [
        { title: 'Company Driver', icon: 'i-lucide-lock', employees: 1, avatars: ['CD'] },
        { title: 'Student-Intern', icon: 'i-lucide-lock', employees: 1, avatars: ['SI'] }
    ]

    return {
        employees,
        orgData,
        floatingRoles
    }
})
