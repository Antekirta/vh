<template functional>
  <nav class="main-nav">
    <ul class="main-nav__list">
      <li class="main-nav__item">
        <router-link to="/" class="main-nav__link">Calculator</router-link>
      </li>

      <li class="main-nav__item">
        <router-link to="/about" class="main-nav__link">About</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class MainNav extends Vue {}
</script>

<style lang="scss">
@import "../../styles/variables";

.main-nav {
  padding: $offset--small $offset--big;
  background-color: var(--color__gray-light);

  @media (max-width: $phone) {
    padding: $offset--small;
  }

  // raise specificity in order to surpass vuetify styles
  & &__list {
    display: flex;
    padding: 0;
  }

  &__item {
    margin-right: $offset--small;
  }

  &__link {
    letter-spacing: 0.05rem;
    font-size: 2rem;
    color: var(--color__blue);
    transition: 0.1s color;

    &:hover {
      color: var(--color__orange);
    }
  }
}
</style>