// vue-cli 
// 
// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import './registerServiceWorker'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')


import Vue from 'vue'
import App from './App'
import router from './router'
import VueMasonry from 'vue-masonry-css'
import VueVisible from 'vue-visible';
import VueLazyload from 'vue-lazyload'
import VueAnalytics from 'vue-analytics';
import './registerServiceWorker'


// Vue use 
Vue.use(VueMasonry);
Vue.use(VueVisible);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    silent: false
})


Vue.use(VueAnalytics, {
    id: 'UA-119588030-1',
    autoTracking: {
        exception: true
    },
    debug: {
        sendHitTask: process.env.NODE_ENV === 'production'
    }
});


Vue.config.productionTip = false



// vuetify

import Vuetify, {
    VApp, // required
    VSnackbar
} from 'vuetify/lib'
//import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
    components: {
        VApp,
        VSnackbar
    },
    directives: {
        //Ripple
    }
})

//import 'vuetify/src/stylus/app.styl'


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
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')