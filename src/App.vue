<template>
  <v-app>
    <Nav />
    <v-card class="overflow-hidden">
      <v-main>
        <v-container fluid>
          <Tabla />
        </v-container>
      </v-main>
    </v-card>
    <Footer />
  </v-app>
</template>

<script>
import Tabla from "./components/Tabla";
import Nav from "./components/markup/Nav";
import Footer from "./components/markup/Footer.vue";

export default {
  name: "App",
  components: {
    Tabla,
    Nav,
    Footer
  },
};
</script>
