<template>
  <div>
    
    <offline/>
    
    <search @onResult="displayResults($event)"></search>

    <offline-content />
   
    <categories @onResult="displayResults($event)" ></categories>


    <div class="container u-mtm" id="screenshots">
      <div class="row">

        <div class="col-sm-12">
              

            <masonry 
             :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
             :gutter="{default: '30px', 700: '15px'}">

              <article v-for="screenshot in screenshots" :key="screenshot.id">
                
                <screenshot :screenData="screenshot" :options="false"></screenshot>
 
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
import screenshot from './screenshot.vue';
import offline from './offline.vue';
import offlineContent from './offline-content';

export default {
  name: 'Home',
  components : {categories,search, screenshot, offline,offlineContent},
     data(){
        return{
            results: null,
            screenshots: null,
        }
    },
    methods: {

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

    mounted(){

      this.$ga.page(this.$router);
      
    }
}
</script>

