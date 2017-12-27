<template>
    <section class="u-sm-mtm">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 u-mts">
            
            <h2>Categories</h2>

            <div class="row">
              <div v-for="categorie in categories" :key="categorie.id" class="col-sm-2 gallery-block u-mls u-mrs" > 
     
                <!-- <router-link :to="{ name: 'Archive', params: { type: 'categories', id: categorie.id }}"> {{categorie.name}} </router-link> -->
                <a @click.prevent="getScreenshots(categorie.id)">  {{categorie.name}} </a>

              </div>
            </div>

            <hr class="u-mts u-mbs">  

            <h2>Tags</h2>

            <div class="row">
              <div v-for="tag in tags" :key="tag.id" class="col-sm-2 gallery-block u-mls u-mrs" > 
                
                  <a @click.prevent="getScreenshots('tags',tag.id)">  {{tag.name}} </a>

              </div>
            </div>

          </div>
        </div>
     </div>
    </section>
</template>

<script>

//import post from './post.vue';

export default {
  name: 'categories',
     data(){
        return{
            categories : [],
            tags : []
        }
    },
    methods: {

      getCategories(){

        fetch('http://localhost:5555/wp-json/wp/v2/categories')
        .then( (response) => response.json() )
        .then( (res) => {

          this.categories = res;


         }).catch( (err) => console.log(res) );

      },


      getScreenshots(type = 'categories', id){

        fetch(`http://localhost:5555/wp-json/wp/v2/media?${ type }=${ id }`)
        .then( (response) => response.json() )
        .then( (res) => {

          this.screenshots = res;

          this.$emit('onResult', this.screenshots  );

          console.log(' 🤡 ', res );

         }).catch( (err) => console.log(res) );

      },


      getTags(){

        fetch('http://localhost:5555/wp-json/wp/v2/tags')
        .then( (response) => response.json() )
        .then( (res) => {

          this.tags = res;


         }).catch( (err) => console.log(res) );

      },
        
    },
    computed: {
	
   
       
    },

    created (){ 

      this.getCategories();
      
      this.getTags();

    },
}
</script>

<style>

  
</style>