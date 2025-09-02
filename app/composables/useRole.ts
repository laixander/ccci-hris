export const useRole = () => {
    return useState<string>('user-role', () => 'Employee') // default role
}