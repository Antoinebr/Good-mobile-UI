<template>
    <section class="bg-img u-mts">
        <div class="container">
            <div class="row">
                <div class="u-mtl">

                    <h1 class="u-txtCenter">Upload a screenshot</h1>
                    <p class="u-txtCenter">Thank you so much for contributing</p>

                    <dropzone class="u-mtm" />
      
                </div>
            </div>
        </div>
    </section>

</template>

<script>    
    import dropzone from './dropzone';
    export default {
        name: 'upload',
        components: {
            dropzone
        },
        data() {
            return {
    
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
   
</style>