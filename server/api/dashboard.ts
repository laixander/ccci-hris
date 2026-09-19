export default eventHandler(async () => {
    const timeInList = [
        { name: 'PAOR, SAGE RYAN ARGAMOSA', role: 'Team Lead Developer', time: '08:28:23 AM', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Sage' },
        { name: 'SURRIGA, JOSEPH EBRON', role: 'Team Lead Developer', time: '08:15:23 AM', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Joseph' },
        { name: 'GALAS, WILLIAM SALUNSON', role: 'Team Lead Developer', time: '08:09:38 AM', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=William' },
    ]
    
    const timeOutList = [
        { name: 'PAOR, MARIA HEIDI', role: 'Chief Operating Officer', time: '08:49:12 AM', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Heidi' },
        { name: 'SUPREMO, ARIEL', role: 'Company Driver', time: '--', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Ariel' },
        { name: 'SUPREMO, ARIES', role: 'Chief Executive Officer', time: '10:07:30 AM', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Aries' },
    ]
    
    const recentActivities = [
        { text: 'Successfully timed in.', time: '4h ago', icon: 'i-lucide-zap', color: 'text-primary' },
        { text: 'Approved Leave Request for SURRIGA, JOSEPH EBRON', time: '5h ago', icon: 'i-lucide-check-circle', color: 'text-success' },
        { text: 'System Maintenance Scheduled', time: '1d ago', icon: 'i-lucide-settings', color: 'text-neutral-500' },
        { text: 'Successfully Applied Leave Request', time: '3d ago', icon: 'i-lucide-zap', color: 'text-primary' },
        { text: 'Successfully timed in.', time: '4d ago', icon: 'i-lucide-zap', color: 'text-primary' },
        { text: 'Overtime Request Rejected', time: '4d ago', icon: 'i-lucide-x-circle', color: 'text-error' },
        { text: 'Successful Login Attempt', time: '4d ago', icon: 'i-lucide-arrow-right', color: 'text-success' },
        { text: 'Updated Profile Information', time: '1w ago', icon: 'i-lucide-user', color: 'text-primary' },
    ]
    
    const onLeaveTodayList = [
        { name: 'DELA CRUZ, JUAN', role: 'Software Engineer', leaveType: 'Sick Leave', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Juan' },
        { name: 'SANTOS, MARIA', role: 'HR Manager', leaveType: 'Vacation Leave', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Maria' }
    ]
    
    const upcomingLeaveList = [
        { name: 'REYES, CARLOS', role: 'UI/UX Designer', leaveType: 'Vacation Leave (Aug 15-18)', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carlos' },
        { name: 'GARCIA, ANA', role: 'Project Manager', leaveType: 'Maternity Leave', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Ana' }
    ]
    
    const birthdaysTodayList: any[] = []
    
    const upcomingBirthdaysList = [
        { name: 'SUPREMO, ARIES', role: 'Chief Executive Officer', date: 'Aug 28', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Aries' }
    ]

    return {
        timeInList,
        timeOutList,
        recentActivities,
        onLeaveTodayList,
        upcomingLeaveList,
        birthdaysTodayList,
        upcomingBirthdaysList
    }
})
