<template>
  <div class="table">
    <thead v-if="thead.length">
      <tr>
        <td
          v-for="cell in thead"
          :key="cell.value"
          :width="`${cell.width || defaultCellWidth}%`"
        >{{cell.value}}</td>
      </tr>
    </thead>

    <tbody>
      <span class="table__empty-body-msg" v-if="!rows.length">{{emptyBodyMsg}}</span>

      <tr v-for="row in rows" :key="row.index">
        <td
          v-for="cell in row.cells"
          :key="cell.value"
          :width="`${cell.width || defaultCellWidth}%`"
          v-html="cell.value"
        ></td>
      </tr>
    </tbody>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { iTableCell, iTableRow } from "../../interfaces/table";

@Component({})
export default class Table extends Vue {
  @Prop({ type: Array, default: () => [] })
  thead: Array<iTableCell>;

  @Prop({ type: Array, required: true, default: () => [[{}]] })
  tbody: Array<Array<iTableCell>>;

  @Prop({ type: String, default: "There is no data to display!" })
  emptyBodyMsg: string;

  get defaultCellWidth() {
    return 100 / this.thead.length;
  }

  get rows(): Array<iTableRow> {
    return this.tbody.map((row, index) => ({
      index,
      cells: row
    }));
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.table {
  width: 100%;
  border-collapse: collapse;

  thead,
  tbody {
    display: table;
    width: 100%;
  }

  thead {
    background-color: var(--color__blue);
    color: var(--color__white);
    font-weight: 300;
    font-size: 1.8rem;
    letter-spacing: 0.08rem;
  }

  td {
    padding: $offset--small 0;
    border: solid 1px var(--color__gray);
    text-align: center;
    font-size: 2rem;

    @media (max-width: $phone) {
      font-size: 1.6rem;
    }
  }

  &__empty-body-msg {
    display: inline-block;
    padding: $offset--small;
    font-size: 1.6rem;
  }
}
</style>