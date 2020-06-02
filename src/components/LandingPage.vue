<template>
  <div class="bg pt-12 pr-0">
    <v-container class="landing-page">
      <div class="ml-6">
        <div class="logo"></div>
      </div>
      <div class="d-flex flex-column align-center">
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
.get-started-btn {
  margin: 12em 0 1em;
}
.bg {
  overflow-x: hidden;
  margin: 0;
  background: url("../assets/Group 1.svg") no-repeat;
}

.logo {
  background: url("../assets/landinglogo.svg") no-repeat;
  padding-bottom: 400px;
  margin: 0 auto;
  max-width: 301px;
}
</style>