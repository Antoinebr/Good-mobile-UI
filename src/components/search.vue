<template>
    <section class="bg-img u-mts">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 header u-mtl">

            <logo />

            <p class="u-txtCenter">Find best practices and inspiration for your project 300 mobile UI screenshots and counting</p>

            <input @keyup.enter="search()" @keydown="count()" v-model="searchQuery" class="search u-shadowM img-center u-mtm" placeholder="Type your query... e.g : checkout form">
            
            <button @click.prevent="search()" class="button u-mts u-sm-mtm u-db-ma button--medium ">
             
              <span v-if="total === '' && total <= 0"> search screenshots</span>

              <span v-else > show the {{total}} screenshot<span v-if="total > 0">s</span> found </span>
              
            </button>

            <p class="u-txtCenter u-mtn info-tip"  v-visible=" total > 0 " > hit enter to perform the query </p>
            
          </div>
        </div>
     </div>
    </section>
</template>

<script>
import logo from './logo' 
import debounce from 'debounce';
import trim from 'lodash/trim';

export default {
  components: {logo},
  name: 'search',
     data(){
        return{
            searchQuery : '',
            hits : null,
            total : '',
        }
    },
    methods: {

      count : debounce( function() {
        
        let query = this.replaceSpaceToAnd(this.searchQuery);

        fetch(`${API_URL}/wp-json/elastic/search/?query=${query}~`)
        .then( (response) => response.json() )
        .then( (res) => {

          this.total = res.hits.total;

         }).catch( (err) => console.log('Rejected ',err) );

      }, 500 ),

      search(){
        
        let query = this.replaceSpaceToAnd(this.searchQuery);

        fetch(`${API_URL}/wp-json/elastic/search/?query=${query}~`)
        .then( (response) => response.json() )
        .then( (res) => {

          this.$emit('onResult', res.hits.hits );

          this.hits = res.hits.hits;

         }).catch( (err) => reject(res) );

      },
      replaceSpaceToAnd(query){

        query = trim(query);
        query = query.replace('  ',' ');
        query = query.replace(' ',' AND ');

        return query;

      }
  },


}
</script>

<style>

.info-tip{
  font-size: 12px!important;
}

</style>

