<template>
  <v-app>
    <div class="app">
      <AppHeader />

      <MainNav />

      <main class="app__main">
        <router-view></router-view>
      </main>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppHeader from "./AppHeader/AppHeader.vue";
import MainNav from "./MainNav/MainNav.vue";

@Component({
  components: { AppHeader, MainNav }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.app {
  color: var(--color__black);

  &__main {
    padding: $offset--big;

    @media (max-width: $phone) {
      padding: $offset--big $offset--small;
    }
  }
}
</style>