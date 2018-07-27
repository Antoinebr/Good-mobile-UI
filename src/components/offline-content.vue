<template>
    <section v-if="offline" class="u-sm-mtm u-mtm">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 u-mts">
                    
                    <h2>Offline content : latest screenshots saved</h2>


                    <masonry 
                        :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
                        :gutter="{default: '30px', 700: '15px'}">

                        <article v-for="(img,index) in imgRequests" :key="index"> 

                        <img :src="img.url"  class="cursor img-responsive border-s u-mts"> 

                        </article>

                    </masonry>

                </div> <!-- col-sm-12 -->
            </div> <!--row -->
        </div> <!-- container -->
    </section>
      
</template>

<script>

import {getCachedRequest,listCaches} from '../ab_modules/caches.js';
export default {
    name: 'offline-content',

     data(){
        return{
            caches: null,
            imgRequests : null
        }
    },

    computed: {
	
        offline () {
            return ! navigator.onLine;
        }
       
    },


    created(){


        listCaches()
            .then(c =>{

                this.caches = c;

                const imgCache = this.caches.filter(cache => cache.includes('image') );

                return getCachedRequest(imgCache);

            })
            .then(requests =>{

                this.imgRequests = requests;

            })
            .catch( error => console.error);
    }
  
}
</script>

<style>

.border-s{
    border: 2px solid #0000002e;
    box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.05) ;
  }

</style>