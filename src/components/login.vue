<template>
    <section class="bg-img u-mts">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-sm-push-3 u-mtl">

                    <h1 class="u-txtCenter">Welcome Back</h1>

                    <p class="u-txtCenter">Enter your email to log into your account</p>

                    <div class="input-group">
                        <div class="form-group u-mts">
                            <label for="password">Username :</label>
                            <input v-model="userLogin" placeholder="Your username">
                        </div>

                        <div class="form-group u-mts">
                            <label for="password">Password :</label>
                            <input v-model="userPassword" type="password" name="password" placeholder="Your Password">
                        </div>
                    </div>

                    <button @click.prevent="performLogin()" class="button u-mts u-sm-mtm u-db-ma button--medium ">Login</button>

                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import { serverBus } from '../main.js';
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

                localStorage.setItem('jwt', jwt);

                serverBus.$emit('logged', 'User logged');

                if (jwt) {
                    alert('You are logged in !');
                }

            }
        }
    }
</script>

<style scoped>
   
</style>