 <template>
    <div>
        <Information :information='dataIndex' v-on:newItem='addItem($event)' />
        <Alert :status="alert" />
        <Pay :dataMount="mountItem" v-on:pay='changeEvent($event)' />
        <v-card>

            <v-card-title>
                <v-btn style="background-color: #00446d;" color=" d-flex justify-center mb-6" @click="newItem" dark
                    class="mb-2">
                    Agregar un nuevo producto
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn style="background-color: #00d9e2;" color=" d-flex justify-center mb-6" @click="activatePay" dark
                    class="mb-2">
                    Continuar con la compra
                </v-btn>
            </v-card-title>

            <v-data-table height="300px" :headers="headers" :items="desserts" :search="search" :items-per-page="5"
                no-data-text="Lo sentimos, no hay resultados :(" no-results-text="Lo sentimos, no hay resultados :("
                class="elevation-0 p-1" :footer-props="{
                    'items-per-page-options': [10, 20, { text: 'TODOS LOS PRODUCTOS', value: -1 }],
                    'items-per-page-text': 'PÁGINAS',
                
                }" :loading="loading" loading-text="Por favor espere..." @click:row="handleClick">

                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Lista de productos</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar producto" class="mx-12">
                        </v-text-field>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="mx-2 mb-5" fab dark small color="primary" v-bind="attrs" v-on="on" @click="getData">
                                    <v-icon>mdi-reload</v-icon>
                                </v-btn>
                            </template>
                            <span>Recargar los datos</span>
                        </v-tooltip>


                    </v-toolbar>
                </template>

            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import { GetData } from '../services/tableService';
import Information from './Information';
import Alert from './Alert';
import Pay from './Pay';

export default {
    name: "Tabla",
    components: {
        Information,
        Alert,
        Pay
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.desserts = [];
            this.loading = true;
            GetData().then(res => {
                //console.log(res.data/*.orders[0].items[0]*/)
                res.data.orders.forEach(element => {
                    this.desserts.push(element.items[0])
                    this.dataEx.push(element)
                });
                this.loading = false;
            }).catch(() => {
                this.alert = { v: 0, status: "err" }
                this.loading = false;
            })
        },
        handleClick(value, row) {
            this.dataIndex = { data: this.dataEx[row.index], status: true };
        },
        newItem() {
            this.dataIndex = { data: [], status: false };
        },
        addItem(event) {
            console.log(this.desserts.length)
            if (this.desserts.length == 0) {
                this.desserts.push(event.items[0]);
                this.dataEx.push(event);
            } else {
                event.number = parseInt(this.dataEx[0].number) + 1;
                event.items[0].id = this.desserts[0].id + 1;
                this.desserts.unshift(event.items[0]);
                this.dataEx.unshift(event);
                this.alert = { v: parseInt(this.dataEx[0].number) + 1, status: "add" };
            }

        },
        activatePay() {
            let mount = 0;
            this.desserts.forEach(element => {
                mount += parseFloat(element.price);
            });
            if (mount == 0) {
                this.alert = { v: 0, status: "no-stok" }
            } else {
                this.mountItem = { m: mount, status: true };
            }

        },
        changeEvent(val) {
            console.log(val.status)
            if (val.pay == true) {
                this.alert = { v: 0, status: "delete" }
                this.mountItem = { m: 0, status: val.status }
                this.desserts = [];
            } else {
                this.mountItem = { m: 0, status: val.status }
            }
        }
    },
    data() {
        return {
            alert: false,
            search: '',
            pagination: { sortBy: "name", descending: false },
            itemsPer: 4,
            loading: true,
            dataIndex: null,
            headers: [
                {
                    text: "SKU",
                    align: "start",
                    sortable: false,
                    value: "sku",
                },
                { text: "Nombre", value: "name" },
                { text: "Caltidad", value: "quantity" },
                { text: "Precio", value: "price" }
            ],
            desserts: [],
            dataEx: [],
            mountItem: 0
        };
    },
}
</script>