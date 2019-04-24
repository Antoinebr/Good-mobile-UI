<template>
    <div>
        <article v-for="(file,index) in uploadedFiles" :key="index" class="u-mbm">

            <div class="container">
                <div class="col-sm-6 screenshot-container">
                    <img class="u-shadowL img-responsive u-dbma" :src="`https://ui.antoinebrossault.com/wp-content/uploads/${file.media_details.file}`" alt="">
                </div>
                <div class="col-sm-6">

                    <h2>Add more infos to your screenshot :</h2>

                    <div v-if="file.isEditing" class="input-group">

                        <div class="form-group u-mts">
                            <label for="password">Title :</label>
                            <input v-model="file.title.raw" placeholder="Your title">
                        </div>

                        <div class="form-group u-mts">
                            <label>Caption :</label>
                            <textarea v-model="file.caption.raw"></textarea>
                        </div>
                    </div>

                    <div v-if="!file.isEditing" class="inputs-as-text">
                        <p class="u-mbn">Title :</p>
                        <p class="u-mtn">{{file.title.raw}}</p>
                        <p class="u-mbn">Caption :</p>
                        <p class="u-mtn">{{file.caption.raw}}</p>
                    </div>

                    <button @click="updateScreeshotData(index)" v-if="file.isEditing" class="button u-mts">save the screenshot's data</button>
                    <button @click="file.isEditing = true" v-if="!file.isEditing" class="button button--ghost u-mts">edit the screenshot's data</button>

                </div>
            </div>

            <hr class="u-mtm" />
        </article>
    </div>
</template>

<script>
    import { updateScreenshotInfos } from '../../api/api';
    import he from 'he';

    export default {
        name: 'edit-screenshot',
        props: ["uploadedFiles"],
        data() {
            return {

            }
        },
        methods: {

            async updateScreeshotData(index) {

                this.uploadedFiles[index].isEditing = false;

                const res = await updateScreenshotInfos({
                    id: this.uploadedFiles[index].id,
                    title: this.uploadedFiles[index].title.raw,
                    caption: this.uploadedFiles[index].caption.raw
                }).catch(console.log)


            },
        }
    }
</script>

<style scoped>
    .form-group {
        width: 100%;
        margin: 0px;
    }

    .screenshot-container img {
        height: 400px;
    }
</style>