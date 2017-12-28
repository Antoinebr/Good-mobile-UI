<template>
    <section class="bg-img u-mts">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 header u-mtl">

            <h1>Mobile UI</h1>

            <p>Find best practices and inspiration for your project</p>
            <p>300 mobile UI screenshots and counting</p>

            <input @keyup.enter="search()" @keydown="count()" v-model="searchQuery" class="search u-shadowM u-mtm" placeholder="Type your query... e.g : checkout form">
            
            
            <button @click.prevent="search()" class="button u-mts u-sm-mtm u-db-ma button--big">
              <span v-if="total !== '' "> {{total}} </span>
              <span v-if="total === '' "> search </span>
               screenshot<span v-if="total > 0">s</span>  
               <span v-if="total !== '' "> found </span>
            </button>
            
            <p class="u-txtCenter u-mtn info-tip" v-if=" total > 0 " > hit enter to perform the query </p>
       
          </div>
   
        </div>
     </div>
    </section>
</template>

<script>

export default {
  name: 'search',
     data(){
        return{
            searchQuery : "",
            hits : null,
            total : '',
        }
    },
    methods: {
    
      count(){


        const goFetch = fetch(`${API_URL}/wp-json/elastic/search/?query=${this.searchQuery}~`)
        .then( (response) => response.json() )
        .then( (res) => {

          this.total = res.hits.total;

         }).catch( (err) => console.log('Rejected ',err) ); 


        let count = this.$debounce(goFetch, 1000)

        count();

      },
      search(){

        fetch(`${API_URL}/wp-json/elastic/search/?query=${this.searchQuery}~`)
        .then( (response) => response.json() )
        .then( (res) => {

          this.$emit('onResult', res.hits.hits );

          this.hits = res.hits.hits;

         }).catch( (err) => reject(res) );


      }

    },
}
</script>

<style>

.bg-img{
  height: 73vh;
  background-image: url('../assets/bg-smartphone.png');
  background-repeat: no-repeat;
  background-position-x: -4%;
}

.info-tip{
  font-size: 12px!important;
}
  
</style>

