<template>
  <div class="modal">
    <div class="modal-content">
      <div @click="$emit('close')" class="close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.25 1H3.75C2.23122 1 1 2.23122 1 3.75V20.25C1 21.7688 2.23122 23 3.75 23H20.25C21.7688 23 23 21.7688 23 20.25V3.75C23 2.23122 21.7688 1 20.25 1Z" stroke="#045C14" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.75 9.25L9.25 14.75M9.25 9.25L14.75 14.75L9.25 9.25Z" stroke="#045C14" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3>Reset Password</h3>
      <div v-if="!showSuccess">
        <p>Enter your email to reset your password</p>
        <form @submit.prevent>
          <input v-model.trim="email" type="email" placeholder="you@email.com" />
        </form>
        <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
        <button @click="resetPassword()" class="button">Reset</button>
      </div>
      <p v-else>Success! Check your email for a reset link.</p>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'
export default {
  data() {
    return {
      email: '',
      showSuccess: false,
      errorMsg: ''
    }
  },
  methods: {
    async resetPassword() {
      this.errorMsg = ''
      try {
        await auth.sendPasswordResetEmail(this.email)
        this.showSuccess = true
      } catch (err) {
        this.errorMsg = err.message
      }
    }
  }
}
</script>