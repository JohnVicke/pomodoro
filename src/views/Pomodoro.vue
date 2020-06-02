<template>
  <div class="pomodoro">
    <Timer />
    <Tasks />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Watch } from "vue-property-decorator";
import Timer from "@/components/Timer.vue";

@Component({
  components: {
    Timer
  }
})
export default class Pomodoro extends Vue {}
</script>
