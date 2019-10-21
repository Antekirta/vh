<template functional>
  <section class="app-header">
    <header class="app-header__title">Exchange Rates Widget</header>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class AppHeader extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.app-header {
  padding: $offset--small * 2 $offset--big;
  background: var(--color__blue);

  @media (max-width: $phone) {
    padding: $offset--small * 2 $offset--small;
  }

  &__title {
    color: var(--color__white);
    letter-spacing: 0.07rem;
    font-size: 4rem;
  }
}
</style>