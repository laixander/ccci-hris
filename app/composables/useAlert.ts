export const useAlert = () => {
    const alertMsg = useState<string | null>('alert-msg', () => 'You have 1 pending timesheet evaluation — overdue by 1 day.')

    const showAlert = (message: string, duration = 0) => {
        alertMsg.value = message
        if (duration > 0) {
            setTimeout(() => {
                alertMsg.value = null
            }, duration)
        }
    }

    const clearAlert = () => {
        alertMsg.value = null
    }

    return { alertMsg, showAlert, clearAlert }
}
