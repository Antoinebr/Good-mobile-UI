<template>
  <div>
    
    <offline/>
    
    <search @onResult="displayResults($event)" @onSearchClick="addSpaceAndScroll()"></search>

    <offline-content />
   
    <categories @onResult="displayResults($event)" @onCatClick="addSpaceAndScroll()"></categories>


    <div class="container u-mtm" id="screenshots">
      <div class="row">

        <div class="col-sm-12">
              
            <heart v-if="loading"  />

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
import heart from './heart.vue';

export default {
  name: 'Home',
  components : {categories,search, screenshot, offline,offlineContent, heart},
     data(){
        return{
            results: null,
            screenshots: null,
            loading : false,
        }
    },
    methods: {

      addSpaceAndScroll(){
        
        document.querySelector('#screenshots').style.minHeight = "80vh";

        this.resetResults();

        this.loading = true; 

        this.$scrollTo.scrollTo( '#screenshots' , 400, VueScollToOptions);

      },

      displayResults(results){ 

        this.loading = false;
        this.screenshots = results;

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

