<template>
    <div class="timer pt-12">
        <div class="timer-container py-12 px-4">
            <div class="tomato pb-n10"></div>
            <div :class="initTimer ? 'card extended' : 'card'">
                <div class="card-menu d-flex flex-row justify-center pt-2 mt-4">
                    <p
                        :class="`mx-2 menu-item ${item.active ? 'active' : ''}`"
                        v-for="item in menuItems"
                        :key="item.name"
                    >
                        {{ item.name }}
                    </p>
                </div>
                <div class="clock text-center">
                    <h1 class>{{ timeLeft() }}</h1>
                    <div class="d-flex flex-column align-center">
                        <v-btn
                            v-if="initTimer && isPaused"
                            class="mb-4"
                            width="200"
                            style="font-family: Montserrat;"
                            @click="resumeTimer"
                            rounded
                            >resume</v-btn
                        >
                        <v-btn
                            v-if="initTimer && !isPaused"
                            class="mb-4"
                            width="200"
                            style="font-family: Montserrat;"
                            @click="pauseTimer"
                            rounded
                            >pause</v-btn
                        >
                        <v-btn
                            v-if="!initTimer"
                            class="mb-4"
                            width="200"
                            style="font-family: Montserrat;"
                            @click="startTimer"
                            rounded
                            >start</v-btn
                        >
                        <v-slide-y-transition>
                            <v-btn
                                v-if="initTimer"
                                width="150"
                                style="font-family: Montserrat;"
                                small
                                class="mb-4 white--text"
                                text
                                @click="stopTimer"
                                >stop timer</v-btn
                            >
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
import { Component, Vue } from 'vue-property-decorator';
import Tasks from '@/components/Tasks.vue';
interface TimerInterface {
    timer: number;
    name: string;
    active: boolean;
}

@Component({
    components: {
        Tasks,
    },
})
export default class Timer extends Vue {
    currentPomodoro = 1;
    shortCycle = 0;
    selectedTimerIndex = 0;
    secondsPassed = 0;
    minutesPassed = 0;
    timerInterval = 0;
    initTimer = false;
    audio = new Audio();
    menuItems = [
        {
            timer: 25,
            name: 'Pomodoro',
            active: true,
        },
        {
            timer: 5,
            name: 'Short Break',
            active: false,
        },
        {
            timer: 15,
            name: 'Long Break',
            active: false,
        },
    ];

    mounted() {
        this.audio = new Audio(require('../assets/bell.mp3'));
    }

    isPaused = false;

    playAlarm() {
        this.audio.play();
    }

    timeLeft() {
        const {
            timerInterval,
            menuItems,
            selectedTimerIndex,
            minutesPassed,
            secondsPassed,
        } = this;
        const selectedTimer = menuItems[selectedTimerIndex].timer;
        let formatMinutes = `${selectedTimer - minutesPassed}`;
        let formatSeconds =
            secondsPassed === 0 ? '00' : `${60 - secondsPassed}`;
        if (60 - this.secondsPassed < 10) {
            formatSeconds = `0${60 - secondsPassed}`;
        }
        if (selectedTimer - minutesPassed < 10) {
            formatMinutes = `0${selectedTimer - minutesPassed}`;
        }
        if (minutesPassed === selectedTimer && secondsPassed === 59) {
            this.stopTimer();
            this.incrementTimer();
            this.playAlarm();
            return '00:00';
        }
        return `${formatMinutes}:${formatSeconds}`;
    }

    incrementTimer() {
        this.shortCycle++;
        const prevIndex = this.selectedTimerIndex;
        if (this.shortCycle < 5) {
            this.selectedTimerIndex++;
            if (this.selectedTimerIndex > 1) this.selectedTimerIndex = 0;
        } else {
            this.selectedTimerIndex = 2;
            this.shortCycle = 0;
        }

        if (prevIndex === 2) this.currentPomodoro++;

        this.selection(this.menuItems[this.selectedTimerIndex]);
    }

    startTimer() {
        if (this.selectedTimerIndex === 0 && this.shortCycle > 4)
            this.currentPomodoro++;
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
        this.isPaused = false;
    }

    pauseTimer(): void {
        this.isPaused = true;
    }

    selection(item: TimerInterface) {
        this.menuItems.map((mi) => (mi.active = mi === item ? true : false));
    }
}
</script>
<style lang="scss" scoped>
.pomodoro-h1 {
    font-size: 1rem;
    font-weight: 400;
}
.tomato {
    background: url('../assets/tomato.svg');
    margin: 1em auto 0;
    width: 40px;
    height: 20px;
}
.timer {
    background: #f48985;

    min-height: 100vh;
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
    margin-top: -10px;
    transition: ease-in-out 0.3s;
    background-color: #c13a3a;
    border-radius: 1em;
    height: 250px;
    overflow: hidden;
    transform-origin: top;
}

.card.extended {
    height: 300px;
}

.card-menu {
    .menu-item {
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
