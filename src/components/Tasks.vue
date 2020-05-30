<template>
  <div class="tasks mx-4">
    <div class="new-task d-flex flex-row align-center">
      <v-text-field
        v-on:keyup.enter="onEnter"
        :key="keyValue"
        ref="form"
        :rules="rules"
        dense
        v-model="newTask"
        dark
        style="font-family: Montserrat;"
        label="Add new task"
        required
        filled
        append-icon="mdi-plus"
        @click:append="addTask"
      >hgello</v-text-field>
    </div>
    <h1 class="tasks-header">Tasks</h1>
    <div class="task-desc" v-if="tasks.length === 0">No current tasks!</div>
    <div v-for="(t, index) in tasks" :key="t" class="task">
      <div class="info-container">
        <v-checkbox v-model="t.active" dark></v-checkbox>
        <p :class="t.active ? 'strike' : ''">{{t.name}}</p>
      </div>
      <v-icon @click="tasks.splice(index, 1)" dark>mdi-close</v-icon>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Watch } from "vue-property-decorator";

interface Task {
  name: string;
  active: boolean;
}

@Component({})
export default class Tasks extends Vue {
  newTask = "";
  keyValue = true;
  tasks: Task[] = [];
  rules = [(v: any) => !!v || "Required"];

  onEnter() {
    this.addTask();
  }
  addTask(): void {
    if (this.validateForm()) {
      this.tasks.push({ name: this.newTask, active: false });
      this.newTask = "";
      this.resetForm();
    }
  }

  validateForm(): boolean {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      return true;
    }
    return false;
  }

  resetForm(): void {
    (this.$refs.form as Vue & { reset: () => void }).reset();
  }
}
</script>

<style lang="scss" scoped>
.tasks-header {
  font-family: Montserrat;
  color: #fff;
  text-align: center;
  margin: 0;
}
.tasks {
  h1 {
    font-family: Montserrat;
    color: #fff;
    font-size: 1.4rem;
    text-align: center;
  }
}
.info-container {
  display: flex;
  flex-direction: row;
}
.task {
  background-color: rgba(255, 255, 255, 0.05);
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: bottom;
  justify-content: space-between;
  margin-top: 1em;
  padding: 1em;
  p {
    font-family: Montserrat;
    color: #fff;
  }
}
.strike {
  text-decoration: line-through;
}
.v-input--selection-controls {
  margin: 0;
  padding: 0;
}

.error--text,
.error--text {
  color: #fff !important;
  caret-color: #c13a3a !important;
}
</style>