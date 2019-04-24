<template>
    <section class="bg-img u-mts">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 header u-mtl">

            <logo />

            <p class="u-txtCenter">Find best practices and inspiration for your project 300 mobile UI screenshots and counting</p>

            <input @keyup.enter="search()" @keydown="count()" v-model="searchQuery" class="search u-shadowM img-center u-mtm" placeholder="Type your query... e.g : ecommerce basket">
            
            <button @click.prevent="search()" class="button u-mts u-sm-mtm u-db-ma button--medium ">
             
              <span v-if="total === '' && total <= 0 "> search screenshots   </span>

              <span v-else-if="total === 0"> nothing found...</span>

              <span v-else > show the {{total}} screenshot<span v-if="total > 0">s</span> found </span>
              
            </button>

            <div v-visible="searching || total > 0 " class="u-txtCenter u-mtn info-tip" > 
              <loader v-if="searching" /> 
              <!-- <span v-if=" total > 0 && searching == false " >hit enter to perform the query</span> -->
            </div>


            

          </div>
        </div>
     </div>
    </section>
</template>

<script>
import logo from './logo'
import loader from './loader' 
import debounce from 'debounce';
import trim from 'lodash/trim';

export default {
  components: {logo,loader},
  name: 'search',
     data(){
        return{
            searchQuery : '',
            hits : null,
            total : '',
            searching : null,
        }
    },
    methods: {

      count : debounce( function() {
        
        let query = this.replaceSpaceToAnd(this.searchQuery);

        this.searching = ( query !== "" ) ? true : false;

        fetch(`${process.env.VUE_APP_API_URL}/wp-json/elastic/search/?query=${query}~`)
        .then( (response) => response.json() )
        .then( (res) => {

          this.searching = false;
          this.total = res.length;

         }).catch( (err) => console.log('Rejected ',err) );

      }, 500 ),

      search(){
        
        history.pushState({}, null, `#/search/${this.searchQuery}`);

        this.$ga.page({page: `#/search/?q=${this.searchQuery}`,title: 'Search' ,location: window.location.href})
        
        this.$emit('onSearchClick');

        let query = this.replaceSpaceToAnd(this.searchQuery);
  
        fetch(`${API_URL}/wp-json/elastic/search/?query=${query}~`)
        .then( (response) => response.json() )
        .then( (res) => {

          this.$emit('onResult', res );

          this.hits = res;

         }).catch( (err) => console.log(err) );

      },
      replaceSpaceToAnd(query){

        query = trim(query);
        query = query.replace('  ',' ');
        query = query.replace(' ',' AND ');

        return query;

      }
  },

  mounted(){

    if( this.$route.params.query ){

      this.searchQuery = this.$route.params.query;

      this.search();
      
    }

  }


}
</script>

<style>

.info-tip{
  font-size: 12px!important;
  min-height: 30px;
}

</style>

