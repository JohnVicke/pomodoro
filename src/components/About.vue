<template>
  <div>
    <div class="text-desc">
      <h1>How does it work?</h1>
      <ol>
        <li>Add tasks to your prioritylist for the day.</li>
        <li>
          Set the timer for your pomodoro
          <br />(default = 25minutes).
        </li>
        <li>Select a task to work on.</li>
        <li>Start the first pomodoro and focus on the task for however long you set the timer</li>
        <li>Take a 5 minute break when the alarm rings</li>
        <li>After 4 pomodoros, take a 15 minute break.</li>
        <li>Restart the cycle until the tasks are done or your workday is over.</li>
      </ol>
    </div>

    <div class="text-desc">
      <h1>Why Pomodoro?</h1>
      <p>
        The Pomodoro Technique makes you more productive by encouraging you to own your time. The timer keeps you accountable for how you manage internal and external distractions.
        It's ok to browse Reddit during your breaks!
        You can get back to your co-workers during your breaks! But when the main timer is running, it's time for you to cross of the tasks in the prioritylist.
        <br />
        <br />By increasing the accountability of your time, it's easier to plan effectively for the future. After using the technique for awhile you start to know how much work can be done during the pomodoro cycles.
        <br />
        <br />Crossing off tasks from the prioritylist also gives motivation and a sense of accomplishment, it's easier to see how much you are progressing and what you have done so far
      </p>
    </div>

    <div class="text-desc">
      <h1>Background</h1>
      <p>
        The Pomodoro Technique is a time managment method developed by Francesco Crillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, seperated by short breaks. Each interval is known as a pomodoro, from the Italian Word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as University student. -
        <span
          style="color: #C13A3A;"
        >Wikipedia</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class About extends Vue {}
</script>

<style lang="scss" scoped>
.text-desc {
  border-left: 5px #f48985 solid;
  padding-left: 1rem;
  margin: 3rem 1rem;
  color: #5a5a5a;
  h1 {
    color: #1a1a1a;
    font-family: Montserrat;
    font-size: 1rem;
  }

  p {
    font-family: Esteban;
  }
  ol {
    font-family: Esteban;
  }
  li {
    margin: 1rem 0;
  }
}
</style>