<template>
  <div class="wrapper">
    <img :src="logo" alt="logo chat App"/>
  </div>
</template>

<script>
import logo from '../assets/icons/logo-wrapper.svg'
export default {
  name : 'Wrapper Components',
  data() {
    return {
      logo : logo
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
    width: 100%;
    height:62px;
    background: #045C14;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
    @media screen and (max-width: 542px){
      display: flex;
    }
  }
</style>


