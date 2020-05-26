<template>
  <v-app>
    <v-content>
      <LandingPage >
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import LandingPage from "./components/LandingPage.vue";

export default Vue.extend({
  name: "App",

  components: {
    LandingPage
  },

  data: () => ({
    //
  })
});
</script>
