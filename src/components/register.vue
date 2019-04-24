<template>
    <section class="bg-img u-mts">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-sm-push-3 u-mtm">

                    <h1 class="u-txtCenter">Welcome</h1>

                    <p class="u-txtCenter">We are so happy to see you want to contribute</p>
                    <form>
                        <div class="input-group">
                            <div class="form-group u-mts">
                                <label for="password">Username :</label>
                                <input v-model="userLogin" autocomplete="username" type="text" placeholder="Your username">
                            </div>

                            <div class="form-group u-mts">
                                <label for="password">Email :</label>
                                <input v-model="userEmail" autocomplete="email" type="email" placeholder="Your email">
                            </div>


                            <div class="form-group u-mts">
                                <label for="password">Password :</label>
                                <input v-model="userPassword" autocomplete="new-password" type="password" name="password" placeholder="Your Password">
                            </div>


                            <div class="form-group u-mts">
                                <label for="passwordConfirm">Password :</label>
                                <input v-model="userPasswordConfirm" autocomplete="new-password" type="password" name="passwordConfirm" placeholder="Confirm your Password">
                            </div>

                            <button @click.prevent="register()" class="button u-mts u-sm-mtm u-db-ma button--medium ">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <v-snackbar v-model="snackbar">{{ snackbarText }} </v-snackbar>
    </section>
</template>

<script>
    import { serverBus } from '../main.js';
    import { registerUser, login } from '../../api/api.js';
    import logo from './logo'

    export default {
        name: 'register',
        components: {
            logo
        },
        data() {
            return {
                userLogin: "",
                userEmail: "",
                userPassword: "",
                userPasswordConfirm: "",
                snackbar: false,
                snackbarText: ""
            }
        },
        methods: {

            async register() {

                if (this.userPassword !== this.userPasswordConfirm) {
                    this.showSnackBar('The password are differents');
                    return false;
                }

                registerUser({
                    username: this.userLogin,
                    password: this.userPassword,
                    email: this.userEmail
                }).then(() => {

                    return login({
                        username: this.userLogin,
                        password: this.userPassword
                    })

                }).then(async JWT => {

                    serverBus.$emit('logged', 'User logged');

                    localStorage.setItem('jwt', JWT);
                    
                    this.showSnackBar('You are now registered and logged in');

                    await new Promise((resolve, reject) => setTimeout(() => resolve(), 800));

                    this.$router.push({ name: 'Account' });

                }).catch(e => {
                    console.log(e);
                    this.showSnackBar(`The registration failed : ${e}`);
                });


            },

            showSnackBar(text) {
                this.snackbarText = text;
                this.snackbar = true;
            }
        }
    }
</script>

<style scoped>

</style>