<template>
  <div>
  
    <search @onResult="displaySearchResults($event)"></search>

   
    <categories @onResult="displayResults($event)" ></categories>


    <div class="container u-mtm" id="screenshots">
      <div class="row">


        <masonry :cols="4" :gutter="30">
          <div v-for="screenshot in screenshots" :key="screenshot.id">
             <img :src="screenshot.media_details.sizes.full.source_url" class="img-responsive u-mts" alt="">
          </div>
        </masonry>

          
        <masonry :cols="4" :gutter="30">
          <article v-for="hit in results" :key="hit._id" > 
              <img :src="hit._source.guid" class="img-responsive u-mts" >
          </article>
        </masonry>

   
         
      </div>  
    </div>
    
   


  </div>
</template>

<script>

import categories from './categories.vue';
import search from './search.vue';


export default {
  name: 'Home',
  components : {categories,search},// name of my component
     data(){
        return{
            results: null,
            screenshots: null
        }
    },
    methods: {

      displaySearchResults(results){ 

        this.resetResults();

        this.results = results;

        this.$scrollTo.scrollTo( '#screenshots' , 400, VueScollToOptions);

      },

      displayResults(results){ 

        this.resetResults();

        this.screenshots = results;

        this.$scrollTo.scrollTo( '#screenshots' , 400, VueScollToOptions);

      },

      resetResults(){

        this.results = null;

        this.screenshots = null 
      }



    },
    computed: {
	
      
       
    },

    created (){ 

    },
}
</script>

<style>



</style>