<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500" persistent>

            <v-card>
                <v-card-title style="background: #00d9e2;" class="text-h5 white--text lighten-2">
                    ¿Está seguro de continuar con el pago?
                </v-card-title>

                <v-card-text style="padding:5%;">
                    <h3>Monto a pagar: ${{ mount }}</h3>
                    <br />
                    <v-select v-model="selectCard" :items="items" filled prepend-icon="mdi-credit-card" label="Tarjeta de debito / credito">
                        <v-icon> mdi-credit-card</v-icon>
                    </v-select>
                    <br />
                    <span>NOTA: LOS PRODUCTOS SE ELIMINARAN DE LA TABLA</span>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-4" text @click="pay(false)">
                        Cancelar
                    </v-btn>

                    <v-btn color="primary" text @click="pay(true)">
                        Pagar
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        dataMount: {
            type: null
        }
    },
    data() {
        return {
            dialog: false,
            mount: 0,
            selectCard:'**** **** **** 1213',
            items: ['**** **** **** 1213', '**** **** **** 1415', '**** **** **** 1718', '**** **** **** 2223'],
        }
    },
    watch: {
        dataMount: function (val) {
            this.dialog = val.status;
            this.mount = val.m;
        }
    },
    methods: {
        pay(status) {
            this.dialog = status
            this.$emit("pay", { status: false, pay: status });
        }
    }
}
</script>