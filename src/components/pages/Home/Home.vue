<template>
  <div class="home">
    <h1 class="home__title">Exchange Rates</h1>

    <ExchangeWidget />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import ExchangeWidget from "../../ExchangeWidget/ExchangeWidget.vue";

@Component({
  components: { ExchangeWidget }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  &__title {
    font-size: 3rem;
  }
}
</style>