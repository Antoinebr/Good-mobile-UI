<template>
    <div id="app">

        <navbar />

        <router-view></router-view>

        <v-snackbar v-model="snackbar" :left="snackbarPosition.left">{{ snackbarText }} </v-snackbar>
    </div>
</template>

<script>
    import navbar from './components/navbar'
    import { serverBus } from './main.js';
    import { register } from 'register-service-worker'
    export default {
        components: {
            navbar
        },
        name: 'app',
        data() {
            return {
                snackbar: false,
                snackbarText: '',
                snackbarPosition: {
                    left: false
                }
            }
        },
        created() {

            serverBus.$on('alert', payload => {

                this.snackbar = true;
                this.snackbarText = payload.message;
                this.snackbarPosition = (typeof payload.position === "undefined") ? { left: false } : payload.position;

            });

            if (process.env.NODE_ENV === 'production') {
                register(`${process.env.BASE_URL}sw.js`, {
                    registrationOptions: { useCache: 'no-cache' },
                    ready() {
                        console.log(
                            'App is being served from cache by a service worker.\n' +
                            'For more details, visit https://goo.gl/AFskqB'
                        )
                    },
                    registered() {
                        console.log('Service worker has been registered.')
                    },
                    cached() {
                        serverBus.$emit('alert', {
                            message: "Content has been cached for offline use.",
                            position: {
                                left: true
                            }
                        });
                        console.log('Content has been cached for offline use.')
                    },
                    updatefound() {
                        console.log('New content is downloading.')
                    },
                    updated() {
                        serverBus.$emit('alert', {
                            message: "New content is available; please refresh",
                            position: {
                                left: true
                            }
                        });
                        console.log('New content is available; please refresh.')
                    },
                    offline() {
                        console.log('No internet connection found. App is running in offline mode.')
                    },
                    error(error) {
                        console.error('Error during service worker registration:', error)
                    }
                })
            }


        }
    }
</script>


<style lang="scss">
    @import './assets/sass/app.scss';
</style>