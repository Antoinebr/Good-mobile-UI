<template>
  <div class="container u-mtm">

    <div class="row">



       <div v-for="screenshot in screenshots"  :key="screenshot.id" class="col-sm-3"> 

        <screenshot :screenData="screenshot" :options="options"></screenshot>

      </div>


    </div> <!-- row -->
  

  </div>
</template>

<script>
import screenshot from './screenshot.vue'; 
import { getScreenshotBySlug } from '../../api/api.js';
export default {
  name: 'Archive',
  components : {screenshot},// name of my component
     data(){
        return{
            screenshots : [],
            categories : null,
            tags : null, 
            options : {
              directPopin : true, 
              figureHidden : true
            }
        }
    },
   

    mounted (){ 

      
      getScreenshotBySlug(this.$route.params.slug)
      .then( s => this.screenshots = s)
      .catch ( e => console.log(e) );


    },
}
</script>

