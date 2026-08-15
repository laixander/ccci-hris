<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const toast = useToast()
const loading = ref(false)

const state = reactive({
  email: '',
  password: '',
  remember: false
})

const onSubmit = async () => {
  loading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  loading.value = false
  console.log('Login submitted:', state.email)
  
  toast.add({
    title: 'Login Successful',
    description: 'Welcome back to the dashboard.',
    color: 'success',
    icon: 'i-lucide-check-circle'
  })
  
  router.push('/')
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard variant="subtle" :ui="{ root: 'w-full max-w-sm shadow-sm' }">
      <template #header>
        <div class="text-center">
          <UIcon name="i-lucide-boxes" class="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 class="text-2xl font-bold text-default">Welcome Back</h1>
          <p class="text-sm text-dimmed mt-1">Sign in to your account</p>
        </div>
      </template>

      <UForm :state="state" @submit="onSubmit" class="space-y-4">
        <UFormField label="Email" name="email">
          <UInput 
            v-model="state.email" 
            type="email" 
            placeholder="you@example.com" 
            icon="i-lucide-mail" 
            size="lg"
            class="w-full" 
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput 
            v-model="state.password" 
            type="password" 
            placeholder="••••••••" 
            icon="i-lucide-lock" 
            size="lg"
            class="w-full" 
          />
        </UFormField>

        <div class="flex items-center justify-between">
          <UCheckbox v-model="state.remember" label="Remember me" />
          <ULink to="#" class="text-sm text-primary font-medium hover:underline">Forgot password?</ULink>
        </div>

        <UButton type="submit" color="primary" size="lg" block class="w-full justify-center mt-2" :loading="loading">
          Sign In
        </UButton>
      </UForm>
      
      <template #footer>
        <p class="text-center text-sm text-dimmed">
          Don't have an account? <ULink to="#" class="text-primary font-medium hover:underline">Sign up</ULink>
        </p>
      </template>
    </UCard>
  </div>
</template>
