<template>
  <div id="login">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
    <!-- <install-prompt ></install-prompt> -->
    <section>
      <div class="col1">
        <img :src="logo" alt="logo" />
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <input v-model.trim="loginForm.email" type="text" placeholder="Your email" id="email1" />
          </div>
          <div>
            <input
              v-model.trim="loginForm.password"
              type="password"
              placeholder="Your password"
              id="password1"
            />
          </div>
          <button @click="login()" class="button">Log In</button>
          <div class="extras">
            <a @click="togglePasswordReset()">Forgot Password</a>
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <input v-model.trim="signupForm.name" type="text" placeholder="Username" id="name" />
          </div>
          <div>
            <input v-model.trim="signupForm.title" type="text" placeholder="name" id="title" />
          </div>
          <div>
            <input
              v-model.trim="signupForm.email"
              type="text"
              placeholder="you@email.com"
              id="email2"
            />
          </div>
          <div>
            <input
              v-model.trim="signupForm.password"
              type="password"
              placeholder="password min 6 characters"
              id="password2"
            />
          </div>
          <button @click="signup()" class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'
import InstallPrompt from '@/components/InstallPrompt'
const logo = require('@/assets/icons/logo.svg')

export default {
  components: {
    PasswordReset,
    'install-prompt' : InstallPrompt
  },
  data() {
    return {
      show:false,
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      logo : logo,
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  mounted(){
    this.show = true
    console.log(this.show)
  },
  methods: {
    toggleShow(){
      this.show = !this.show
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      })
    }
  }
}
</script>