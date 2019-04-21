// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import Vue from 'vue'
import App from './App'
import router from './router'
import VueMasonry from 'vue-masonry-css'
import VueVisible from 'vue-visible';
import VueLazyload from 'vue-lazyload'
import VueAnalytics from 'vue-analytics'

// ENDPOINTS 
window.API_URL = require('./endpoints.js');


// Vue use 
Vue.use(VueMasonry);
Vue.use(VueVisible);
Vue.use(VueLazyload,{
  preLoad : 1.3,
  silent : false
})


Vue.use( VueAnalytics, {
  id: 'UA-119588030-1',
  autoTracking: {
    exception: true
  },
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
});

Vue.config.productionTip = false




// Vue proto


Vue.prototype.$scrollTo = require('vue-scrollto');


window.VueScollToOptions = {
  container: 'body',
  easing: 'ease-in',
  offset: -60,
  cancelable: true,
  onDone: function() {
    // scrolling is done
  },
  onCancel: function() {
    // scrolling has been interrupted
  },
  x: false,
  y: true
}

// ServerBus is usefulle to comunicates events betxeen components
export const serverBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


