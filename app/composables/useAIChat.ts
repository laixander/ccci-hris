type ChatMessage = { role: 'user' | 'ai'; text: string }

const isAIChatOpen = ref(false)
const aiInput = ref('')
const chatMessages = ref<ChatMessage[]>([])

const quickPrompts = [
  { label: 'File a leave', icon: 'i-lucide-calendar' },
  { label: 'Check my DTR', icon: 'i-lucide-file-text' },
  { label: 'View payslip', icon: 'i-lucide-file-stack' },
]

const AI_RESPONSES: Record<string, string> = {
  'file a leave': 'Sure! To file a leave, go to Leaves → Apply Leave and fill out the form. You can choose from Vacation Leave, Sick Leave, and more.',
  'check my dtr': 'You can check your DTR under the Timesheet section. It shows your daily time-in/out records for the current cutoff period.',
  'view payslip': 'Payslips are available under Payroll → My Payslips. You can download a PDF copy for any given pay period.',
}

function getAIReply(input: string): string {
  const lower = input.toLowerCase()
  for (const [key, val] of Object.entries(AI_RESPONSES)) {
    if (lower.includes(key)) return val
  }
  return `I received your question: "${input}". I'm still learning — please check with HR for more specific queries!`
}

export const useAIChat = () => {
  const chatEndRef = ref<HTMLDivElement | null>(null)

  async function sendMessage(text?: string) {
    const msg = (text ?? aiInput.value).trim()
    if (!msg) return
    chatMessages.value.push({ role: 'user', text: msg })
    aiInput.value = ''
    isAIChatOpen.value = true
    await nextTick()
    chatEndRef.value?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      chatMessages.value.push({ role: 'ai', text: getAIReply(msg) })
      nextTick(() => chatEndRef.value?.scrollIntoView({ behavior: 'smooth' }))
    }, 800)
  }

  return {
    isAIChatOpen,
    aiInput,
    chatMessages,
    chatEndRef,
    quickPrompts,
    sendMessage,
  }
}
