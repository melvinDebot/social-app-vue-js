<template>
  <div class="alert alert-dismissible alert-info" v-if="showInstallBanner">
    <button type="button" class="close" @click.prevent="install">&times;</button>
    Do you want to <a href="#" @click.prevent="install">add this app to your home screen?</a>
  </div>
</template>

<script>
let installEvent;
export default {
  name: 'installPrompt',
  data() {
    return {
      showInstallBanner: true
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      installEvent = e;
      this.showInstallBanner = true;
    });
  },
  methods: {
    install() {
      this.showInstallBanner = false;
      installEvent.prompt();
      installEvent.userChoice.then(() => {
        installEvent = null;
      });
    }
  }
};
</script>

<style lang="scss">
.alert{
  width:30%;
  height: 30%;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  background:lightgreen;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 6px;
  align-items: center;
  padding: 0px 10px;
  button{
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: 1px solid
  }
  a {
    margin-top: 20px;
    font-weight: 500
  }

}
</style>
