export const useDemoAuth = () => {
    const router = useRouter()
    const toast = useToast()
    
    const currentUser = ref({
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=JohnDoe'
    })
    
    const role = ref('admin')
    const isAdmin = computed(() => role.value === 'admin')
    
    const logout = () => {
        console.log('User logged out')
        toast.add({
            title: 'Logged Out',
            description: 'You have been successfully logged out.',
            color: 'info',
            icon: 'i-lucide-info'
        })
        router.push('/login')
    }
    
    return {
        currentUser,
        role,
        isAdmin,
        logout
    }
}
