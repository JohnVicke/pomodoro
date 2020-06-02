<template>
  <v-app>
    <NavBar style="position:fixed; width: 100%; z-index: 1; " />
    <v-content>
      <v-slide-x-transition>
        <router-view />
      </v-slide-x-transition>
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
<style lang="scss" scoped>
</style>