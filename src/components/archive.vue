<template>
  <div class="container u-mtm">

    <div class="row">



       <div v-for="screenshot in screenshots"  :key="screenshot.id" class="col-sm-3"> 

        <img :src="screenshot.media_details.sizes.full.source_url" class="img-responsive" alt="">

      </div>

    </div> <!-- row -->
  

  </div>
</template>

<script>

export default {
  name: 'Archive',
  //components : {categories,search},// name of my component
     data(){
        return{
            screenshots : []
        }
    },
    methods: {
        
    },
    computed: {
	
   
       
    },

    mounted (){ 

      fetch(`http://localhost:5555/wp-json/wp/v2/media?${ this.$route.params.type }=${ this.$route.params.id }`)
      .then( (response) => response.json() )
      .then( (res) => {

        this.screenshots = res;

       }).catch( (err) => console.log(res) );


    },
}
</script>

<style>



</style>