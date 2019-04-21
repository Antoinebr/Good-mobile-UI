<template>
    <div>
        <div class="dropzone">
            <input type="file" class="input-field" ref="file" @change="sendFile()" multiple>

            <svg v-if="!uploading" class="u-dbma u-mtm" width="41px" height="27px" viewBox="0 0 41 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="-Upload" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Desktop" transform="translate(-532.000000, -353.000000)" fill="#4A4A4A" fill-rule="nonzero">
                        <g id="cloud-upload-outline" transform="translate(532.000000, 353.000000)">
                            <path d="M33.05625,10.1925 C31.8945833,4.370625 26.7183333,0 20.5,0 C15.5629167,0 11.275,2.7675 9.13958333,6.8175 C3.9975,7.3575 0,11.660625 0,16.875 C6.93262595e-16,22.4668831 4.58908131,27 10.25,27 L32.4583333,27 C34.7237242,27 36.8963305,26.1110517 38.4982038,24.5287135 C40.100077,22.9463753 41,20.8002641 41,18.5625 C41,14.1075 37.4979167,10.49625 33.05625,10.1925 L33.05625,10.1925 Z M32.4583333,23.625 L10.25,23.625 C6.47605421,23.625 3.41666667,20.6029221 3.41666667,16.875 C3.41666667,13.415625 6.03041667,10.53 9.49833333,10.175625 L11.32625,9.99 L12.1804167,8.386875 C13.8033333,5.29875 16.9808333,3.375 20.5,3.375 C24.9758333,3.375 28.8366667,6.51375 29.7079167,10.850625 L30.2204167,13.381875 L32.8341667,13.5675 C35.4991667,13.73625 37.5833333,15.946875 37.5833333,18.5625 C37.5833333,21.3584415 35.2887927,23.625 32.4583333,23.625 L32.4583333,23.625 Z M13.6666667,15.1875 L18.0229167,15.1875 L18.0229167,20.25 L22.9770833,20.25 L22.9770833,15.1875 L27.3333333,15.1875 L20.5,8.4375 L13.6666667,15.1875 Z" id="Shape"></path>
                        </g>
                    </g>
                </g>
            </svg>

            <p v-if="!uploading" class="call-to-action">
                Drag a screenshot here OR browse
            </p>

            <heart class="u-mts" v-if="uploading" />

        </div>
        
    
        <section class="uploads-edit" v-if="uploadedFiles.length > 0">

            <hr class="u-mtm u-mbm">

            <h2 class="u-mbm">Your uploads :</h2>

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

                        <button @click="updateScreeshotData(index)"  v-if="file.isEditing" class="button u-mts">save the screenshot's data</button>
                        <button @click="file.isEditing = true"  v-if="!file.isEditing" class="button button--ghost u-mts">edit the screenshot's data</button>

                    </div>
                </div>

                <hr class="u-mtm" />
            </article>


        </section>

    </div>
</template>

<script>
    import { updateScreenshotInfos } from '../../api/api';
    import heart from './heart';

    export default {
        name: 'dropzone',
        components: {
            heart
        },
        data() {
            return {
                file: "",
                message: "",
                error: false,
                uploading: false,
                uploadedFiles: []
            }
        },
        methods: {
            async sendFile() {

                this.uploading = true;

                for (const file of this.$refs.file.files) {

                    const formData = new FormData();

                    formData.append("file", file);
                    formData.append("status", "draft");

                    const res = await fetch('https://ui.antoinebrossault.com/wp-json/wp/v2/media', {
                        method: 'post',
                        headers: {
                            //'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        },
                        body: formData
                    });

                    const insertedScreenshot = await res.json();

                    if (res.ok) {

                        // we set s.isEditing to true ( default state to show the form and not the paragraphs)
                        insertedScreenshot.isEditing = true;

                        this.uploadedFiles.push(insertedScreenshot);
                    }

                }

                this.uploading = false;

            },

            async updateScreeshotData(index) {

                this.uploadedFiles[index].isEditing = false;
           
                const res = await updateScreenshotInfos({
                    id: this.uploadedFiles[index].id,
                    title: this.uploadedFiles[index].title.raw,
                    caption: this.uploadedFiles[index].caption.raw
                }).catch(console.log)

                console.log(res);

            }
        }
    }
</script>

<style scoped>
    .dropzone {
        min-height: 200px;
        padding: 10px 10px;
        position: relative;
        outline: 2px dashed #80808078;
    }

    .dropzone:hover {
        background-color: #80808024;
    }

    .dropzone .call-to-action {
        font-size: 1.2rem;
        text-align: center;
        margin-top: 10px;
    }


    .input-field {
        opacity: 0;
        width: 100%;
        height: 200px;
        position: absolute;
        cursor: pointer;
    }

    .form-group {
        width: 100%;
        margin: 0px;
    }

    .screenshot-container img {
        height: 400px;
    }
</style>