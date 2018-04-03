<template>
      <div>
          
          <div v-if="offline" class="offline-banner">
              your are offline 😔
          </div>
     </div>
</template>

<script>

export default {
    name: 'offline-banner',

    computed: {
	
        offline () {
            return ! navigator.onLine;
        }
       
    },

}

</script>

<style scoped>

.offline-banner{
    position: fixed;
    background-color: #6d6d6d;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #FFF;
    z-index: 1;
}
  
</style>