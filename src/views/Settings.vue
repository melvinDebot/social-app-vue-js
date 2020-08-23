<template>
  <section id="settings">
    <div class="col1">
      <div class="col2">
        <img :src="logo" alt="logo" />
      </div>
      <p>Update your profile</p>

      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>
      <h3>Settings</h3>

      <form @submit.prevent>
        <label for="name">Change your username</label>
        <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />

        <label for="title">Change your Description</label>
        <input v-model.trim="title" type="text" :placeholder="userProfile.title" id="title" />

        <button @click="updateProfile()" class="button">Update Profile</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import logo from '../assets/icons/Logo.svg'
export default {
  data() {
    return {
      name: '',
      title: '',
      showSuccess: false,
      logo : logo
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name,
        title: this.title !== '' ? this.title : this.userProfile.title
      })
      this.name = ''
      this.title = ''
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  }
}
</script>