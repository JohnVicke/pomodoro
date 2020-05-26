<template>
  <div class="home">
    <LandingPage />
    <About />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import LandingPage from "@/components/LandingPage.vue";
import About from "@/components/About.vue";

@Component({
  components: {
    LandingPage,
    About
  }
})
export default class Home extends Vue {}
</script>
