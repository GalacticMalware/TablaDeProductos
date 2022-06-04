<template>
    <v-footer height="auto" color="">
        <v-layout justify-center row wrap>
            <v-flex py-3 align-self-center xs12 style="background: #f5f5f7;">
                <h6 style="color:#646465; font-size:18px; justify-content:center; display:flex">Esta aplicación web fue
                    desarrollada con las siguientes tecnologías</h6>
            </v-flex>


            <img class="px-2" style="width:58px; height:48px;"
                src="https://soyescandon.herokuapp.com/img/vuejs2.859d932a.svg" />

            <img class="px-2" style="width:58px; height:48px;"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg" />

            <v-flex style="background: #f5f5f7;justify-content:center; display:flex;" py-3 text-xs-center balck--text
                xs12>
                &copy;2022 — Pagos
                <strong></strong>
            </v-flex>
        </v-layout>
    </v-footer>

</template>

<script>
export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
    }),
}
</script>