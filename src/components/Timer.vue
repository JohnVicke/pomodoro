<template>
  <div class="timer pt-12">
    <div class="timer-container py-12 px-4">
      <h1 class="text-center">Currently on Pomodoro #1</h1>
      <div class="card">
        <div class="card-menu d-flex flex-row justify-center pt-2 mt-4">
          <p
            :class="`mx-2 menu-item ${item.active ? 'active' : ''}`"
            v-for="item in menuItems"
            :key="item.name"
            @click="selection(item)"
          >{{item.name}}</p>
        </div>
        <div class="clock text-center">
          <h1 class>{{timeLeft()}}</h1>
          <div class="d-flex flex-column align-center">
            <v-btn
              v-if="initTimer && isPaused"
              class="mb-4"
              width="200"
              style="font-family: Montserrat;"
              @click="resumeTimer"
              rounded
            >resume</v-btn>
            <v-btn
              v-if="initTimer && !isPaused"
              class="mb-4"
              width="200"
              style="font-family: Montserrat;"
              @click="pauseTimer"
              rounded
            >pause</v-btn>
            <v-btn
              v-if="!initTimer"
              class="mb-4"
              width="200"
              style="font-family: Montserrat;"
              @click="startTimer"
              rounded
            >start</v-btn>
            <v-slide-y-transition>
              <v-btn
                v-if="initTimer"
                width="150"
                style="font-family: Montserrat;"
                small
                class="mb-4 white--text"
                text
                @click="stopTimer"
              >stop timer</v-btn>
            </v-slide-y-transition>
          </div>
        </div>
      </div>
    </div>
    <!--    Tasks    !-->
    <Tasks />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tasks from "@/components/Tasks.vue";
interface TimerInterface {
  index: number;
  timer: number;
  name: string;
  active: boolean;
}

@Component({
  components: {
    Tasks
  }
})
export default class Timer extends Vue {
  selectedTimer = 25;
  timerState = {
    Pomodoro: 25,
    "Short Break": 5,
    "Long Break": 15
  };
  secondsPassed = 0;
  minutesPassed = 0;
  timerInterval = 0;
  initTimer = false;
  menuItems = [
    {
      index: 0,
      timer: 25,
      name: "Pomodoro",
      active: true
    },
    {
      index: 1,
      timer: 5,
      name: "Short Break",
      active: false
    },
    {
      index: 2,
      timer: 15,
      name: "Long Break",
      active: false
    }
  ];

  isPaused = false;

  timeLeft() {
    const {
      timerInterval,
      menuItems,
      selectedTimer,
      minutesPassed,
      secondsPassed
    } = this;
    let formatMinutes = `${selectedTimer - minutesPassed}`;
    let formatSeconds = secondsPassed === 0 ? "00" : `${60 - secondsPassed}`;
    if (60 - this.secondsPassed < 10) {
      formatSeconds = `0${60 - secondsPassed}`;
    }
    if (selectedTimer - minutesPassed < 10) {
      formatMinutes = `0${selectedTimer - minutesPassed}`;
    }
    if (minutesPassed === selectedTimer && secondsPassed === 59) {
      clearInterval(timerInterval);
      return "00:00";
    }
    return `${formatMinutes}:${formatSeconds}`;
  }
  startTimer() {
    if (!this.initTimer) {
      this.initTimer = true;
      this.timerInterval = setInterval(() => {
        if (this.minutesPassed === 0) this.minutesPassed++;
        if (!this.isPaused) {
          this.secondsPassed++;
          if (60 - this.secondsPassed === 0) this.secondsPassed = 0;
          if (this.secondsPassed % 60 === 0) {
            this.minutesPassed += 1;
          }
        }
      }, 1000);
    }
  }

  stopTimer(): void {
    this.isPaused = false;
    this.initTimer = false;
    clearInterval(this.timerInterval);
    this.resetTimer();
  }

  resetTimer(): void {
    this.secondsPassed = 0;
    this.minutesPassed = 0;
  }

  resumeTimer(): void {
    console.log("resumetimer");
    this.isPaused = false;
  }

  pauseTimer(): void {
    console.log("pausedtimer");
    this.isPaused = true;
  }

  selection(item: TimerInterface) {
    this.selectedTimer = item.timer;
    this.menuItems.map(mi => (mi.active = mi === item ? true : false));
  }
}
</script>
<style lang="scss" scoped>
.timer {
  min-height: 100vh;
  background: rgb(126, 231, 119);
  background: linear-gradient(
    45deg,
    rgba(126, 231, 119, 1) 0%,
    rgba(244, 137, 133, 1) 0%,
    rgba(235, 112, 130, 1) 100%
  );
}
.timer-container {
  margin: 0 auto;
  max-width: 40em;
  color: #fff;
  font-family: Montserrat;
  h1 {
    font-size: 1.2rem;
  }
}
.card {
  background-color: #c13a3a;
  border-radius: 1em;
}

.card-menu {
  .menu-item {
    cursor: pointer;
    user-select: none;
    font-weight: 700;
    font-size: 0.9rem;
    transition: 0.1s ease-out;
  }
  .menu-item.active {
    border-left: 5px #fff solid;
    padding-left: 0.4em;
  }
}

.clock {
  h1 {
    font-size: 5rem;
  }
}
</style>