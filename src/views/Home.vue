<template>
  <div class="home">
    <LandingPage msg="hello world" />
  </div>
</template>

<script>
// @ is an alias to /src
import LandingPage from "@/components/LandingPage.vue";

export default {
  name: "Home",
  components: {
    LandingPage
  }
};
</script>
