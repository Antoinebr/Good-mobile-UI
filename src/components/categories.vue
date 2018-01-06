<template>
    <section class="u-sm-mtm u-mtm">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 u-mts">
            
            <h2>Categories</h2>

            <div class="row">
              <div v-for="categorie in categories" :key="categorie.id"> 
     
                <a @click.prevent="getScreenshot('categories',categorie.id)" >  
                  <div class="col-sm-2 gallery-block u-mls u-mrs" > {{categorie.name}}  </div>
                </a>

              </div>
            </div>

            <hr class="u-mts u-mbs">  

            <h2>Tags</h2>

            <div class="row">
              <div v-for="tag in tags" :key="tag.id"> 

                <a @click.prevent="getScreenshot('tags',tag.id)">  
                  <div class="col-sm-2 gallery-block u-mls u-mrs u-mts" >  {{tag.name}}  </div>
                </a>

              </div>
            </div>

          </div>
        </div>
     </div>
    </section>
</template>

<script>

import { getCategories, getTags, getScreenshots } from '../../api/api.js';

export default {
  name: 'categories',
     data(){
        return{
            categories : [],
            tags : []
        }
    },

    methods:{
      getScreenshot(type,id){

          getScreenshots(type,id).then( s =>{
             
             this.screenshots = s;
             this.$emit('onResult', this.screenshots  );
          })
          .catch( e => console.log(e) );
      }

    },
    created (){ 

      getCategories()
      .then( c => {

        window.categories = c; 
        this.categories = c;

      })
      .catch( e => console.log('Error : ', e) );
      
      getTags()
      .then( t =>{
         
        window.tags = t;
        this.tags = t;

      })
      .catch( e => console.log('Error : ', e) );

    },
}
</script>

