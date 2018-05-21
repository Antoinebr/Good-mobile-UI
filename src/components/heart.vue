<template>
     <div>
        <img class="heart pulse" src="../assets/heart.png">

        <p class="u-txtCenter">loading...</p>
     </div>
</template>



<script>
export default {
    name: 'heart'
}
</script>

<style scoped>


.heart{
  max-width: 20%;
  display: block;
  margin: auto;
}

p{padding-left: 10px}

@media only screen and (max-width: 520px){
  	
  .heart{
    max-width: 17%;
    position: relative;
    top: -7px;
    padding-left: 11px;
    -webkit-transform: scale(1.14);
    transform: scale(1.04);
  }
}

@keyframes pulse_animation {
    0% { transform: scale(1); }
    30% { transform: scale(1); }
    40% { transform: scale(1.08); }
    50% { transform: scale(1); }
    60% { transform: scale(1); }
    70% { transform: scale(1.05); }
    80% { transform: scale(1); }
    100% { transform: scale(1); }
}

.pulse {
    animation-name: pulse_animation;
    animation-duration: 5000ms;
    transform-origin:70% 70%;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
</style>







