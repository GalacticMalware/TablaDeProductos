<template>
  
    <v-app-bar
      style="background: #004f7c;"
      dark
      max-height="75"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title><v-icon color="white darken-2" >mdi-shopping </v-icon> Pagos</v-toolbar-title>
    </v-app-bar>

</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
  }
</script>   