<template>
    <section class="bg-img u-mts">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-sm-push-3 header u-mtl">

                    <logo />

                    <p class="u-txtCenter">Welcome back my friend ! Please login. </p>

                    <input v-model="userLogin" class=" u-shadowM img-center u-mtm" placeholder="Your login">
                    <input v-model="userPassword" class="u-shadowM img-center u-mtm" placeholder="Your Passwod">

                    <button @click.prevent="performLogin()" class="button u-mts u-sm-mtm u-db-ma button--medium ">Login</button>

                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import { login } from '../../api/api.js';
    import logo from './logo'

    export default {
        name: 'Login',
        components: {
            logo
        },
        data() {
            return {
                userLogin: "",
                userPassword: ""
            }
        },
        methods: {

            async performLogin() {

                const jwt = await login({
                    username: this.userLogin,
                    password: this.userPassword
                }).catch(console.log);

                localStorage.setItem('jwt',jwt);

                if(jwt){
                    alert('You are logged in !');
                }

            }
        }
    }
</script>

<style scoped>
    textarea {
        width: 100%;
    }
</style>