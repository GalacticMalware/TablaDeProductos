<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

            <v-card class="mx-auto" max-width="344">
                <v-toolbar dark style="background: #1d4e72;" >
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items v-if="!reading">
                        <v-btn dark text :disabled="!valid" @click="validate">
                            Guardar
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-card-text>
                    <br />
                    <p class="text-h4 text--primary" v-if="reading">Numero de orden <strong>{{ numOr }}</strong></p>
                    <v-container grid-list-md>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formData.sku" label="Sku del producto" :disabled="reading"
                                            :rules="skuRules" required :counter="10" placeholder="Sku" />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Nombre del producto" v-model="formData.name" :disabled="reading"
                                            :rules="nameRules" :counter="30" placeholder="Nombre" />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Cantidad del producto" v-model="formData.quantity" :disabled="reading"
                                            :rules="quantityRules" :counter="1" placeholder="Cantidad" />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Precio del producto" v-model="formData.price" :disabled="reading"
                                            :rules="priceRules" :counter="3" placeholder="precio" />
                                    </v-col>

                                    <template v-if="reading">
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field label="ID del producto" v-model="formData.id"
                                                :disabled="reading" placeholder="A" />
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field label="Descuento" v-model="formData.discount"
                                                :disabled="reading" placeholder="A" />
                                        </v-col>
                                    </template>

                                </v-row>
                            </v-container>
                        </v-form>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    
    name: "Information",
    props: {
        information: {
            type: null
        }
    },
    data() {
        return {
            dialog: false,
            numOr: 0,
            valid: true,
            reading: null,
            formData: [],
            title: "",
            nameRules: [
                v => !!v || 'Por favor ingrese el Nombre del prodcuto',
                v => (v && v.length <= 30) || 'El Nombre no puede tener mas de 10 letras',
            ],
            quantityRules: [
                v => !!v || 'Por favor ingrese la Cantidad de prodcutos',
                v => (v && v.length <= 1) || 'La cantidad de productos a exediddo',
            ],
            skuRules: [
                v => !!v || 'Por favor ingrese el Sku de prodcutos',
                v => (v && v.length <= 10) || 'El Sku no puede tener mas de 10 letras',
            ],
            priceRules: [
                v => !!v || 'Por favor ingrese el Precio de prodcutos',
                v => (v && v.length <= 3) || 'El producto no puede tener un precio mayor a 999',
                
            ],
            dataReset: { sku: "", name: "", quantity: 0, price: 0.00, id: 104111762638201, discount: "0.00" },
        }
    },
    watch: {
        information: function (val) {
            this.numOr = val.data.number;
            this.dialog = true;
            this.reading = val.status;
            this.formData = val.status === true ? val.data.items[0] : Object.assign({},this.dataReset);
            this.title = val.status === true ? "Información detallada" : "Nuevo productor"
        },

    },
    methods: {
        validate() {
            this.$refs.form.validate()
            if (this.$refs.form.validate()) {
                this.dialog = false;
                this.$emit("newItem", { number: "11111", items: [this.formData] });
            }
        },
    },
}
</script>