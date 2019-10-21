<template>
  <div class="about">
    <h2>About</h2>

    <p>Look, how I can!</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class About extends Vue {}
</script>

<style lang="scss" scoped>
.about {
  h2 {
    font-weight: bold;
  }
}
</style>