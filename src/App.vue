<template>
  <v-app>
    <NavBar style="position:fixed; z-index: 1;" />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";

export default Vue.extend({
  name: "App",

  components: { NavBar },

  data: () => ({
    //
  })
});
</script>
