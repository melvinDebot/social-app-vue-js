<template>
  <header>
    <section>
      <div class="header--desktop">
        <router-link to="/">
          <img :src="logo" alt="logo" />
        </router-link>
        <ul class="inline">
          <li>
            <router-link to="/">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/settings">Settings</router-link>
          </li>
          <li>
            <a @click="logout()">logout</a>
          </li>
        </ul>
      </div>
      <div class="header--mobile">
        <ul>
          <li>
            <home-picto to="/" />
          </li>
          <li>
            <setting-picto to="/settings"/>
          </li>
          <li>
            <a @click="logout()">
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.375 24.5416V26.7916C21.375 28.1724 20.2557 29.2916 18.875 29.2916H6.45834C5.07762 29.2916 3.95834 28.1724 3.95834 26.7916V11.2083C3.95834 9.8276 5.07762 8.70831 6.45834 8.70831H18.875C20.2557 8.70831 21.375 9.8276 21.375 11.2083V13.4583"
                  stroke="#045C14"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M34.8333 19H14.2499M34.8333 19L28.4999 12.6667M34.8333 19L28.4999 25.3334"
                  stroke="#045C14"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>

import logo from '@/assets/icons/logo.svg'
import HomePicto from '@/components/atoms/icons/IconHomeNav'
import SettingPicto from '@/components/atoms/icons/IconSettingNav'

export default {
  data(){
    return {
      logo : logo
    }
  },  
  components : {
    'home-picto' : HomePicto,
    'setting-picto' : SettingPicto
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>