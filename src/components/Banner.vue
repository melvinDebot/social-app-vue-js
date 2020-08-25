<template>
  <div class="banner">
    <button class="banner-button" :style="{'display' : installBtn}" @click="install">
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

