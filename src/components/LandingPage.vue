<template>
  <div :class="$vuetify.breakpoint.xs ? 'mobile-bg pt-12 pr-0' : 'desktop-bg pt-12 pr-0'">
    <v-container class="landing-page">
      <div class="ml-6">
        <div class="logo"></div>
      </div>
      <div class="d-flex flex-column align-center">
        <div v-if="$vuetify.breakpoint.xs" class="extra-margin"></div>
        <v-btn
          style="font-family: Montserrat; font-weight: bold; "
          class="get-started-btn"
          width="220px"
          rounded
          primary
          elevation="4"
          color="#C13A3A"
          dark
          large
          @click="$router.push({path: 'pomodoro'})"
        >Get started</v-btn>
        <v-icon
          @click="$vuetify.goTo(700, 300)"
          :dark="!$vuetify.breakpoint.xs"
          class="mt-12"
        >mdi-chevron-down</v-icon>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class LandingPage extends Vue {}
</script>

<style scoped>
.extra-margin {
  margin-top: 10em;
}

.desktop-bg {
  background: url("../assets/desktop.svg");
  margin: 0;
  padding-bottom: 344px;
  overflow-x: hidden;
}

.mobile-bg {
  background: url("../assets/mobile.svg") no-repeat;
  overflow-x: hidden;
  margin: 0;
}

.logo {
  background: url("../assets/landinglogo.svg") no-repeat;
  padding-bottom: 400px;
  margin: 0 auto;
  max-width: 301px;
}
</style>