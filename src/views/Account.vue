<template>
    <section class="bg-img u-mts">
        <div class="container">
            <div class="row">
                <div class="u-mtl">

                    <section v-if="uploadedFiles">
                        <h1 v-if="user" class="u-txtCenter">{{user.name}}'s uploads</h1>
                        <p class="u-txtCenter">Review and edit your uploads </p>
                        <hr>
                        <editScreenshot :uploadedFiles="uploadedFiles" />
                    </section>

                    <section v-if="!uploadedFiles">
                        <h1 v-if="user" class="u-txtCenter">Welcome aboard {{user.name}} 😊 </h1>
                        <p class="u-txtCenter">You don't have any uploads ( yet )</p>
                        <hr>
                        
                        <a href="/#/upload" class="button u-dbma u-mtm"> Upload your first screenshot</a>
                    </section>

                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import editScreenshot from '../components/edit-screenshot';

    import { getUserScreenshot, getCurrentUserInfo } from '../../api/api';

    export default {
        name: 'account',
        components: {
            editScreenshot
        },
        data() {
            return {
                uploadedFiles: null,
                user: null
            }
        },
        methods: {

        },
        created() {
            getUserScreenshot()
                .then(r => this.uploadedFiles = r)
                .catch(console.log)

            getCurrentUserInfo().then(user => this.user = user).catch(console.log)
        }
    }
</script>

<style scoped>

</style>