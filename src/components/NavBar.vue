<template>
    <div class="nav">
        <v-container
            v-if="toggleMenu"
            class="d-flex flex-column justify-center menu"
        >
            <p>content</p>
            <p>this is lit</p>
            <p>home</p>
        </v-container>
        <div
            :style="
                $vuetify.breakpoint.smAndDown
                    ? 'width: 100%; padding: 0 1rem;'
                    : 'width: 60%; margin: 0 auto;'
            "
            class="pt-4 d-flex flex-row justify-space-between align-top"
        >
            <div>
                <p
                    style="
        
  color: #fff;
  font-family: Esteban;
  cursor: pointer;
        "
                    @click="$router.push({ path: '/' })"
                >
                    pomodoro timer
                </p>
            </div>
            <div
                v-if="$vuetify.breakpoint.smAndDown"
                class="hamburger-container"
                @click="onClick()"
            >
                <div :class="getLine1ClassName()"></div>
                <div :class="getLine2ClassName()"></div>
            </div>
            <div v-if="$vuetify.breakpoint.mdAndUp" class="d-flex flex-row">
                <p
                    style="
        
  color: #fff;
  font-family: Esteban;
  cursor: pointer;
        "
                    @click="$router.push({ path: '/' })"
                    class="mr-4"
                >
                    home
                </p>
                <p
                    @click="$router.push({ path: '/pomodoro' })"
                    style="
        
  color: #fff;
  font-family: Esteban;
  cursor: pointer;
        "
                    class="ml-4"
                >
                    timer
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
    toggleMenu = false;

    @Emit()
    getLine2ClassName() {
        return this.toggleMenu ? 'line2 open' : 'line2';
    }
    @Emit()
    getLine1ClassName() {
        return this.toggleMenu ? 'line1 open' : 'line1';
    }
    onClick() {
        this.toggleMenu = !this.toggleMenu;
    }
}
</script>

<style lang="scss" scoped>
.nav {
    background: #f48985;
}
.menu {
    position: absolute;
    z-index: 10;
    height: 100vh;
    width: 100vw;
    color: white;
    background-color: #c13a3a;
}
.hamburger-container {
    cursor: pointer;
    z-index: 100;
}

.line1 {
    width: 40px;
    height: 4px;
    background-color: #fff;
    transition: 0.2s ease-out;
}
.line2 {
    margin-left: 10px;
    width: 30px;
    height: 4px;
    background-color: #fff;
    margin-top: 6px;
    transition: 0.3s ease-out;
}

.line2.open {
    margin-left: 0;
    transform: rotate(405deg);
}
.line1.open {
    width: 30px;
    transform: translateY(10px) rotate(-45deg);
}
</style>
