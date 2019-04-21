<template>
    <div>
        <div class="container">
            <h1>I'm a h1 headline</h1>
            <h2>I'm a h2 headline</h2>
            <hr>
            <p>Lorem ipsum dolor sit met, qui at desert mandamus, adduce ullum apeirian mea at. Eu mel vide saltando vituperata, sonet quidam deterruisset te qui. Te cum vivendum explicate abhorrent. Id venom argumentum vel. Ut lorem bocent hendrerit eam.</p>

            <hr>

            <h2>Form</h2>


            <div class="input-group">
                <div class="form-group u-mts">
                    <label for="password">Username :</label>
                    <input v-model="userLogin" placeholder="Your username">
                </div>
                <div class="form-group u-mts">
                    <label for="password">Password :</label>
                    <input v-model="userPassword" type="password" name="password" placeholder="Your Password">
                </div>

                <div class="form-group u-mts">
                    <label>Textarea :</label>
                    <textarea></textarea>
                </div>
            </div>

            <hr class="u-mtm ">

            <h2>CTAs</h2>

            <button class="button">button primary</button>

            <button class="button button--medium ">button medium</button>

            <button class="button button--ghost ">button ghost</button>
            
            <hr class="u-mtm ">

             <h2>Shadows</h2>

            <img src="https://ui.antoinebrossault.com/wp-content/uploads/2018/11/Timbeland-home-page-.png" class="u-shadowL img-responsive" alt="">

        </div>
    </div>
</template>

<script>
    export default {
        name: 'styleguide'
    }
</script>