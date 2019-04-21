<template>
    <section class="bg-img u-mts">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-sm-push-3 u-mtl">

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
                userPasswordConfirm: ""
            }
        },
        methods: {

            async register() {

                if (this.userPassword !== this.userPasswordConfirm) {
                    alert('The password are differents');
                    return false;
                }

                const user = await registerUser({
                    username: this.userLogin,
                    password: this.userPassword,
                    email: this.userEmail
                }).catch(console.log);

                const JWT = await login({
                    username: this.userLogin,
                    password: this.userPassword
                }).catch(console.log);


                serverBus.$emit('logged', 'User logged');

                localStorage.setItem('jwt', JWT);


                console.log(user);

            }
        }
    }
</script>

<style scoped>

</style>