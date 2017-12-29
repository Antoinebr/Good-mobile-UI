<template>
     <div class="heart-container img-center">
        <img class="logo" src="../assets/logo.svg">
        <img class="heart" src="../assets/heart.png">
     </div>
</template>


<style scoped>

.logo{
   max-width: 80%;
}

.heart{
  max-width: 20%;
  position: relative;
  top: -7px;
  padding-left: 20px;
  transform: scale(1.14);
}

.heart-container{
  width: 760px;
  max-width: 100%;
}

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


</style>

