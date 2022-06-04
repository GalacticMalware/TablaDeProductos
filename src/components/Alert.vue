<template>
    <div>
        <div class="text-center ma-2">
            <v-snackbar :timeout="3000" v-model="alert" :vertical="false" :right='true' :top="true" :color="type">
                {{ text }}
                <template v-slot:action="{ attrs }">
                    <v-btn color="white" text v-bind="attrs" @click="alert = false">
                        <v-icon  color="white darken-2" >
                            mdi-close
                        </v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        status: {
            type: null
        }
    },
    data() {
        return {
            alert: false,
            text: "",
            type:""
        }
    },
    watch: {
        status: function (val) {
            this.alert = true
            if(val.status == "add"){
                this.text = "Los datos se han guardado correctamente :)"
                this.type = "success"
            }else if(val.status == "delete"){
                this.text = "Se ha realizado el pago exitosamente :)"
                this.type = "success"
            }else if(val.status == "err"){
                this.text = "Lo sentimos, ha ocurrido un error :("
                this.type = "red"
            }else if (val.status == "no-stok"){
                this.text = "Lo sentimos, aun no hay productos :("
                this.type = "red"
            }
            //this.$emit("statusAlert",false)
        }
    }
}
</script>