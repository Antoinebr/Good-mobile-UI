<template>
  <div id="app">

      <navbar/>
      
      <router-view></router-view>
      
  </div>
</template>

<script>
import navbar from './components/navbar'
export default {
  components:{
    navbar
  },
  name: 'app'
}
</script>


<style lang="scss">
@import './assets/sass/app.scss';


</style>
