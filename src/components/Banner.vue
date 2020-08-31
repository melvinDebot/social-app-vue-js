<template>
  <div class="banner" :style="{'display' : installBtn}">
    <button class="banner-button"  @click="install">
      Install
    </button>
  </div>
</template>

<script>
export default {
  
  data(){
    return{
      installBtn : "block",
      install : undefined
    }
  },
  mounted(){
    console.log('heyy je suis monté')
  },
  created(){
    let installPrompt;

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      installPrompt = e;
      this.installBtn = "block"
    });
    this.install = () => {
      this.installBtn = "none";
      installPrompt.prompt();
      installPrompt.userChoice.then(result => {
        if(result.outcome === 'accepted'){
          console.log('user accepted')
        } else {
          console.log('user denied')
        }
        installPrompt = null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner{
  width: 50%;
  height: 50%;
  background: red;
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


