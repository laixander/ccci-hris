export const useDemoAuth = () => {
    const currentUser = ref({
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=JohnDoe'
    })
    
    const role = ref('admin')
    const isAdmin = computed(() => role.value === 'admin')
    
    const logout = () => {
        console.log('User logged out')
        // router.push('/login')
    }
    
    return {
        currentUser,
        role,
        isAdmin,
        logout
    }
}
