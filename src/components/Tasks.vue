<template>
    <div class="tasks mx-auto px-4">
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
            ></v-text-field>
        </div>
        <transition name="slide-fade">
            <h1 v-if="tasks.length !== 0" class="tasks-header">Tasks</h1>
        </transition>
        <draggable
            :animation="200"
            ghost-class="moving-card"
            v-model="tasks"
            @start="drag = true"
            @end="drag = false"
        >
            <div v-for="(t, index) in tasks" :key="index" class="task item">
                <div class="info-container">
                    <v-checkbox v-model="t.active" dark></v-checkbox>
                    <p :class="t.active ? 'strike' : ''">{{ t.name }}</p>
                </div>
                <v-icon @click="tasks.splice(index, 1)" dark>mdi-close</v-icon>
            </div>
        </draggable>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Watch } from 'vue-property-decorator';
import draggable from 'vuedraggable';
interface Task {
    name: string;
    active: boolean;
}

@Component({
    components: {
        draggable,
    },
})
export default class Tasks extends Vue {
    newTask = '';
    keyValue = true;
    tasks: Task[] = [];
    rules = [(v: any) => !!v || 'Required'];

    onEnter() {
        this.addTask();
    }
    addTask(): void {
        if (this.validateForm()) {
            this.tasks.push({ name: this.newTask, active: false });
            this.newTask = '';
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

    mounted() {
        if (localStorage.tasks) {
            this.tasks = JSON.parse(localStorage.tasks);
        }
    }

    @Watch('tasks', { immediate: false })
    loadTasks(newTasks: Task[]): void {
        localStorage.tasks = JSON.stringify(newTasks);
    }
}
</script>

<style lang="scss" scoped>
.moving-card {
    border: 1px solid;
    border-color: #c13a3a;
    opacity: 50%;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}
.tasks-header {
    font-family: Montserrat;
    color: #fff;
    text-align: center;
    margin: 0;
}
.tasks {
    max-width: 40em;
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
    max-width: 40em;
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
