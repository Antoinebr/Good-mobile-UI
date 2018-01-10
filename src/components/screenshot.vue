<template>
  <div>

    <div class="front-figure u-mtm">
      <img v-lazy="screenData.media_details.sizes.full.source_url" @click="setPopin()" v-if="!figureHidden"  class="cursor img-responsive border-s u-mts" alt="">
    </div>
    
    <transition name="fade">

      <article v-show="popin" class="container popin"> 
        <div class="row popin-row"  >

          <div class="col-sm-6 col-md-6 col-xs-12 u-ptm figure">

            <img v-lazy="screenData.media_details.sizes.full.source_url" class="img-responsive border-s img-center" alt="">

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

        
                <div v-if="categoriesData"  >
                  <div v-for="(cat,index,id) in categories"  :key="id" > 
                    <div  :class="{ 'u-mls u-xs-mln': index !== 0 }" class="col-sm-4 gallery-block no-cursor" >  
                      {{cat.name}}
                    </div>
                  </div>
                </div>

              </div> <!-- col-sm-12 -->

              <div class="col-sm-12 col-xs-12 u-mts u-xs-mtn">

                <div v-if="tagsData && tags.length > 1" >
                  <div v-for="(tag,index,id) in tags" :key="id" > 
                    <div v-if="tag !== undefined " >
                      <div  :class="{ 'u-mls u-xs-mln': index !== 0 }" class="col-sm-4 gallery-block no-cursor" >  
                        {{tag.name}}
                      </div>
                    </div>
                  </div>
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

import { getCategories, getTags } from '../../api/api.js';

import find from 'lodash/find';

export default {
  props : ['screenData','options'],
  name: 'screenshot',

     data(){
        return{
          popin : false,
          figureHidden : false,
          closeRedirectHp : false,
          categoriesData : false,
          tagsData : false
        }
    },
    methods: {

      setPopin(){

        this.popin = true; 
        
        history.pushState({}, null, `#/screenshot/${this.screenData.slug}`);

      },

      closePopin(){

        this.popin = false;
  
        if( this.closeRedirectHp ) this.$router.push({ path: '/' });

        else  history.pushState({}, null, `#/`);

        //else history.back();
        
      },

      stripHtmlTags(OriginalString){

        return OriginalString.replace(/(<([^>]+)>)/ig,"");

      },

      myKey(event) {

        if (event.code === "Escape") this.closePopin();

        document.removeEventListener('click', this.myKey);

      }
        
    },

    computed : {

      categories(){
        
     
        var categories = [];

        this.screenData.categories.forEach( c => {

          categories.push( find(this.categoriesData, ['id', c] ) ); 

        });

        return categories;

      },


      tags(){
        
     
        var tags = [];

        this.screenData.tags.forEach( t => {

          tags.push( find(this.tagsData, ['id', t] ) ); 

        });

        return tags;

      }


    },

    mounted (){ 

      window.addEventListener('keyup', this.myKey);  // listen esc key to close the popin 


      if( typeof window.categories === "undefined" )  getCategories().then( c =>  this.categoriesData = c )
      else this.categoriesData = window.categories;
      

      if( typeof window.tags === "undefined" ) getTags().then( t =>  this.tagsData = t );
      else this.tagsData = window.tags;


      if ( this.options !== false ){
          
        this.popin = this.options.directPopin; // trigger the popin directly 
        this.figureHidden = this.options.figureHidden; // hide the cover image outside of the popin
        this.closeRedirectHp = true; // Go back to home on close
        
      } 


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

  .front-figure{
    /* border: solid 1px red;*/
    min-height: 180px;
  }

  .cursor:hover{
    cursor: pointer;
  }

  .no-cursor:hover{
    cursor: default;
  }


  .popin .content .close{
    position: absolute;
    top: 5%;
    right: 5%;
    cursor: pointer;
    border: 30px solid transparent;
  }


  .border-s{
    border: 2px solid #0000002e;
    box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.05) ;
  }

  .boder-s:hover{
    border: none;
    
  }

@media only screen and (max-width: 425px){
  	
   .popin .content .close{  border-right: 0px; }
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
    
    .popin img{max-height: 70vh;}
     
  }

</style>