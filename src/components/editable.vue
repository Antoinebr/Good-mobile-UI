<template>
    <div>
        <p>
            <span @dblclick="askForEdit()" v-show="!editing">
                {{stripHtmlTags(value)}}
            </span>
            <span v-show="editing">
                <textarea :value="stripHtmlTags(value)" @input="$emit('input', $event.target.value)" @keydown.enter="editing=false"></textarea>
            </span>
        </p>
        <button @click="sync()" v-show="editing" class="button "><span>save</span></button>
        <button @click="editing = false" v-show="editing" class="button  button--ghost"><span>cancel</span></button>
    </div>
</template>

<script>
    import { updateScreenshotInfos } from '../../api/api.js';
    import he from 'he';
    export default {
        name: 'editable',
        props: ["value","id"],
        data() {
            return {
                editing: false,
            }
        },
        methods: {
            stripHtmlTags(OriginalString) {

                return he.decode(OriginalString.replace(/(<([^>]+)>)/ig, ""));

            },
            askForEdit(){

                this.editing = localStorage.getItem('jwt') ? true : false; 

            },
            async sync() {

            
                // @todo : handle the error in the UI ( inform the user )
                const res = await updateScreenshotInfos({
                        id: this.id,
                        caption: this.value
                    })
                    .catch(e => alert(`Impossible to edit ${e}`));

                console.log(res)

                // Let's close it 
                this.editing = false

            }
        }
    }
</script>

<style scoped>
    textarea {
        width: 100%;
        height: 100px;
    }
</style>