<template>
  <div>

    <img :src="screenData.media_details.sizes.full.source_url" @click="setPopin()" class="img-responsive border-s u-mts" alt="">

    <transition name="fade">

      <article v-show="popin" class="container popin"> 
        <div class="row popin-row"  >

          <div class="col-sm-6 col-md-6 col-xs-12 u-ptm figure">

            <img :src="screenData.media_details.sizes.full.source_url" class="img-responsive border-s img-center" alt="">

          </div> <!-- figure --> 

          <div class="col-sm-6 col-md-6 col-xs-12 u-ptm content clearfix">

            <div class="close" @click="closePopin()" > X </div>

            <h2>{{screenData.title.rendered}}</h2>

            <div v-if="screenData.caption.rendered !== '' ">

              <hr class="u-mts u-mbs"> 

              <p>{{stripHtmlTags(screenData.caption.rendered)}}</p>

            </div> 
            
            <hr class="u-mts u-mbs"> 

            <div class="row u-xs-pbs ">
              <div class="col-sm-12 col-xs-12 ">

                <div v-for="(cat,index,id) in screenData.categories"  v-bind="index" :key="id" :class="{ 'u-mls ': index !== 0 }" class="col-sm-4 gallery-block" > 
                    {{ categoriesIdtoName('categories',cat) }}
                </div>
              </div> <!-- col-sm-12 -->

              <div class="col-sm-12 col-xs-12 u-mts">

                <div v-for="(tag,index,id) in screenData.tags" :key="id" :class="{ 'u-mls' : index !== 0 }"  class="col-sm-4 gallery-block" > 
                  {{ categoriesIdtoName('tags',tag) }}    
                </div>

              </div> <!-- col-sm-12 -->
            </div> <!-- row -->     
           

          </div> <!-- content -->

        </div> <!-- row -->
      </article> <!-- container -->

    </transition> <!-- name-fade -->

  </div>
</template>

<script>

export default {
  props : ['screenData'],
  name: 'screenshot',

     data(){
        return{
          popin : false,
          rowHeight : null
        }
    },
    methods: {

      setPopin(){

        this.popin = true; 

      },


      closePopin(){

        this.popin = !this.popin;

      },

      categoriesIdtoName(type = 'categories', id){

        let cat =  window[type].filter( t => t.id === id);
        
        return ( cat[0].name !== "undefined") ? cat[0].name : false;

      },

      stripHtmlTags(OriginalString){

        return OriginalString.replace(/(<([^>]+)>)/ig,"");

      }
        
    },

    mounted (){ 

      window.addEventListener('keyup', (event) => {

        if (event.code === "Escape") this.popin = false;

      });      

    },
}
</script>


<style>

  .popin{
    position : fixed;
    top: 0px;
    right: 0px;
    bottom : 0px;
    left: 0px;
    background-color: #FFFFFF;
    opacity: 0.99;

    overflow: scroll;
  }

  .popin img{
    max-height: 80vh;
  }

  .close{
    color: #4a4a4a;
    font-size: 35px;
  }

  .popin .content,.figure{
    position: relative;
    max-height: 100vh;
  }


  .popin .content .close{
    position: absolute;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s ease-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .vertical-center{

    position: absolute;
    top: 50%;
    margin-top: -348px;

  }

 @media only screen and (min-width: 768px){
   	
    .popin-row{
      height: 80vh;
      position: absolute;
      width: 100%;
      top: 50%;
      margin-top: -40vh;
    } 

 }


  @media only screen and (max-width: 425px){
    
    .popin img{
      max-height: 70vh;
    }
     
  }

</style>
