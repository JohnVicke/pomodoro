<template>
  <div class="timer">
    <div class="timer-container">
      <h1 class="text-center">Currently on Pomodoro #1</h1>
      <div class="card">
        <div class="card-menu d-flex flex-row justify-center px-2 pt-2 mt-4">
          <p
            :class="`mx-2 menu-item ${item.active ? 'active' : ''}`"
            v-for="item in menuItems"
            :key="item.name"
            @click="selection(item)"
          >{{item.name}}</p>
        </div>
        <div class="clock text-center">
          <h1 class>{{timeLeft()}}</h1>
          <v-btn class="mb-4" width="200" @click="startTimer" rounded>start</v-btn>
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
      this.timerInterval = setInterval(() => {
        if (!this.initTimer) {
          this.initTimer = true;
          this.minutesPassed++;
        }
        this.secondsPassed++;
        if (60 - this.secondsPassed === 0) this.secondsPassed = 0;
        if (this.secondsPassed % 60 === 0) {
          this.minutesPassed += 1;
        }
      }, 100);
    }
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
  padding: 4rem 1rem;
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