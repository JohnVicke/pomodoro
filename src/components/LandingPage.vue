<template>
  <div class="bg pt-12">
    <v-container class="landing-page">
      <div class="logo"></div>
      <div class="d-flex flex-column align-center">
        <v-btn
          style="font-family: Montserrat; font-weight: bold; "
          class="mt-4 mb-12"
          width="220px"
          rounded
          primary
          elevation="4"
          color="#C13A3A"
          dark
          large
          @click="$router.push({path: 'Timer'})"
        >Get started</v-btn>
        <v-icon class="mt-12">mdi-chevron-down</v-icon>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class LandingPage extends Vue {
  @Prop() private msg!: string;
  hello = "hello world";
}
</script>

<style scoped>
.bg {
  overflow-x: hidden;
  margin: 0;
  background: url("../assets/Group 1.svg") no-repeat;
}

.logo {
  background: url("../assets/landinglogo.svg") no-repeat;
  padding-bottom: 550px;
  margin: 0 2em;
  width: 100%;
}
</style>