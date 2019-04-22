<template>
    <nav>
        <div class="container">
            <div class="row">

                <div class="logo-container">
                    <router-link to="/">
                        <img class="logo" src="../assets/logo.svg">
                        <img class="heart" src="../assets/heart.png">
                    </router-link>
                </div>

                <ul class="listInline">
                    <li v-if="isLogged">
                        <router-link to="/upload">
                            <svg id="icon-upload" width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="navbar" transform="translate(-802.000000, -14.000000)" fill="#5A5A5A" fill-rule="nonzero">
                                        <g id="image-plus">
                                            <g transform="translate(802.000000, 14.000000)">
                                                <path d="M1.71428571,0 C0.767511857,0 0,0.767511857 0,1.71428571 L0,13.7142857 C0,14.6610596 0.767511857,15.4285714 1.71428571,15.4285714 L9.50571429,15.4285714 C9.45428571,15.1457143 9.42857143,14.8628571 9.42857143,14.5714286 C9.42857143,13.9885714 9.53142857,13.4057143 9.72857143,12.8571429 L1.71428571,12.8571429 L4.71428571,9 L6.85714286,11.5714286 L9.85714286,7.71428571 L11.7685714,10.26 C12.6,9.72 13.5771429,9.42857143 14.5714286,9.42857143 C14.8628571,9.42857143 15.1457143,9.45428571 15.4285714,9.50571429 L15.4285714,1.71428571 C15.4285714,0.762857143 14.6571429,0 13.7142857,0 L1.71428571,0 L1.71428571,0 Z M13.7142857,11.1428571 L13.7142857,13.7142857 L11.1428571,13.7142857 L11.1428571,15.4285714 L13.7142857,15.4285714 L13.7142857,18 L15.4285714,18 L15.4285714,15.4285714 L18,15.4285714 L18,13.7142857 L15.4285714,13.7142857 L15.4285714,11.1428571 L13.7142857,11.1428571 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            Upload a screenshot
                        </router-link>
                    </li>

                    <li v-if="!isLogged">
                        <router-link to="/register">
                            <svg width="22px" height="16px" viewBox="0 0 22 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="navbar" transform="translate(-891.000000, -14.000000)" fill="#5A5A5A" fill-rule="nonzero">
                                        <g id="account-plus" transform="translate(891.000000, 14.000000)">
                                            <path d="M14,10 C11.33,10 6,11.33 6,14 L6,16 L22,16 L22,14 C22,11.33 16.67,10 14,10 L14,10 Z M5,6 L5,3 L3,3 L3,6 L0,6 L0,8 L3,8 L3,11 L5,11 L5,8 L8,8 L8,6 L5,6 Z M14,8 C16.209139,8 18,6.209139 18,4 C18,1.790861 16.209139,0 14,0 C11.790861,0 10,1.790861 10,4 C10,6.209139 11.790861,8 14,8 Z" id="Shape"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            Register
                        </router-link>
                    </li>

                    <li v-if="!isLogged">
                        <router-link to="/login">
                            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="navbar" transform="translate(-1012.000000, -14.000000)" fill="#5A5A5A" fill-rule="nonzero">
                                        <g id="account">
                                            <g transform="translate(1012.000000, 14.000000)">
                                                <path d="M8,0 C10.209139,0 12,1.790861 12,4 C12,6.209139 10.209139,8 8,8 C5.790861,8 4,6.209139 4,4 C4,1.790861 5.790861,0 8,0 L8,0 Z M8,10 C12.42,10 16,11.79 16,14 L16,16 L0,16 L0,14 C0,11.79 3.58,10 8,10 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            Login
                        </router-link>
                    </li>

                     <li v-if="isLogged" @click="logout()"> 
                        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="navbar" transform="translate(-1012.000000, -14.000000)" fill="#5A5A5A" fill-rule="nonzero">
                                    <g id="account">
                                        <g transform="translate(1012.000000, 14.000000)">
                                            <path d="M8,0 C10.209139,0 12,1.790861 12,4 C12,6.209139 10.209139,8 8,8 C5.790861,8 4,6.209139 4,4 C4,1.790861 5.790861,0 8,0 L8,0 Z M8,10 C12.42,10 16,11.79 16,14 L16,16 L0,16 L0,14 C0,11.79 3.58,10 8,10 Z" id="Shape"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        Logout
                    </li>


                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import { serverBus } from '../main.js';
    export default {
        name: "navbar",
        data() {
            return {
                name: "",
                isLogged:false
            }
        },
        methods: {

            isUserLoggedIn() {
                return (window.localStorage.getItem('jwt')) ? true : false;
            },

            logout(){
                window.localStorage.removeItem('jwt');
                this.isLogged = false;
            }

        },
        created() { 

            serverBus.$on('logged', () => {
                this.isLogged = this.isUserLoggedIn()
            });
        }
    }
</script>
<style scoped>
    nav {
        height: 44px;
        line-height: 44px;
        background-color: white;
        border-bottom: 1px solid #00000014;
    }

    ul {
        float: right;
        text-align: right;
        display: inline-block;
    }

    ul li {
        padding-right: 13px
    }

    #icon-upload {
        position: relative;
        top: 5px;
    }

    .logo-container {
        display: inline-block;
    }

    .logo-container .logo {
        width: 50%;
    }

    .logo-container .heart {
        width: 23px;
        position: relative;
        left: 1px;
        top: -2px;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .container{
        padding: inherit!important;
    }
</style>