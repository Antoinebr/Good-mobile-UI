<template>
  <div>
  
    <search @onResult="displaySearchResults($event)"></search>

   
    <categories @onResult="displayResults($event)" ></categories>


    <div class="container u-mtm" id="screenshots">
      <div class="row">

        <div class="col-sm-12">

            <masonry 
             :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
             :gutter="{default: '30px', 700: '15px'}">

              <div v-for="screenshot in screenshots" :key="screenshot.id">
                <img :src="screenshot.media_details.sizes.full.source_url" class="img-responsive border-s u-mts" alt="">
              </div>
            </masonry>

              
            <masonry 
              :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
              :gutter="{default: '30px', 700: '15px'}">

              <article v-for="hit in results" :key="hit._id" > 
                  <img :src="hit._source.guid" class="img-responsive u-mts border-s u-mts" >
              </article>
            </masonry>

        </div>

      </div>  
    </div>
    
   


  </div>
</template>

<script>

import categories from './categories.vue';
import search from './search.vue';


export default {
  name: 'Home',
  components : {categories,search},
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
}
</script>

<style>

.border-s{
    border: 2px solid #0000002e;
    box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.05) ;
}

.boder-s:hover{
  border: none;
  
}


</style>