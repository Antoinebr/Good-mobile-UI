<template>
    <section class="bg-img u-mts">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-sm-push-3 u-mtm">

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

                    <button @click.prevent="performLogin()" class="button u-mts u-sm-mtm u-db-ma button--medium">Login</button>

                </div>
            </div>
        </div>
        <v-snackbar v-model="snackbar">{{ snackbarText }} </v-snackbar>
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
                userPassword: "",
                snackbar: false,
                snackbarText: ''
            }
        },
        methods: {

            async performLogin() {


                if (this.userLogin === "") {

                    serverBus.$emit('alert', {
                        message: 'Error the username can\'t be empty'
                    });
                    return;
                }

                if (this.userPassword === "") {

                    serverBus.$emit('alert', {
                        message: 'Error the password can\'t be empty'
                    });

                    return;
                }

                login({
                        username: this.userLogin,
                        password: this.userPassword
                    })
                    .then(async jwt => {

                        localStorage.setItem('jwt', jwt);

                        serverBus.$emit('logged', 'User logged');

                        if (jwt) {
                            serverBus.$emit('alert', {
                                message: "You are now logged in"
                            });
                        }

                        this.$router.push({ name: 'Account' });

                        return;

                    }).catch(error => {

                        serverBus.$emit('alert', {
                            message: 'Error : The username or/and password are not correct'
                        });
                        console.log(error);

                    });

            },

            showSnackBar(text) {
                this.snackbarText = text;
                this.snackbar = true;
            }
        }
    }
</script>