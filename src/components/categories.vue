<template>
    <section class="u-sm-mtm u-mtm">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 u-mts">
            
            <h2>Categories</h2>

            <div class="row">
              <div v-for="categorie in categories" :key="categorie.id"> 
     
                <a @click.prevent="getScreenshots(categorie.id)" >  
                  <div class="col-sm-2 gallery-block u-mls u-mrs" > {{categorie.name}}  </div>
                </a>

              </div>
            </div>

            <hr class="u-mts u-mbs">  

            <h2>Tags</h2>

            <div class="row">
              <div v-for="tag in tags" :key="tag.id"> 

                <a @click.prevent="getScreenshots('tags',tag.id)">  
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

        fetch(`${API_URL}/wp-json/wp/v2/categories`)
        .then( (response) => response.json() )
        .then( (res) => {
          
          window.categories = res;

          this.categories = res.filter( c =>  c.slug !== "uncategorized" && c.count > 1 );

         }).catch( (err) => console.log(res) );

      },


      getScreenshots(type = 'categories', id){

        fetch(`${API_URL}/wp-json/wp/v2/media?${ type }=${ id }`)
        .then( (response) => response.json() )
        .then( (res) => {

          this.screenshots = res;

          this.$emit('onResult', this.screenshots  );

         }).catch( (err) => console.log(res) );

      },


      getTags(){

        fetch(`${API_URL}/wp-json/wp/v2/tags`)
        .then( (response) => response.json() )
        .then( (res) => {

          this.tags = res;

          window.tags = this.tags;

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

