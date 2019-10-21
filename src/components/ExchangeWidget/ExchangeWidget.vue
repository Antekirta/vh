<template>
  <div class="exchange-widget">
    <p>Data are available since {{firstAvailableDate}}</p>

    <p class="exchange-widget__error">{{error}}</p>

    <div class="exchange-widget__main">
      <div class="exchange-widget__table">
        <div class="exchange-widget__currencies">
          <div class="exchange-widget__currency">
            <v-select v-model="baseCurrency" :items="allCurrencies">
              <template slot="label">
                <span class="exchange-widget__select-label">Base currency</span>
              </template>

              <template slot="item" slot-scope="props">
                <span class="exchange-widget__select-item">{{ props.item }}</span>
              </template>
            </v-select>
          </div>

          <div class="exchange-widget__currency">
            <v-select
              v-model="currenciesToRate"
              :items="allCurrencies.filter(currency => currency !== baseCurrency)"
              multiple
            >
              <template slot="label">
                <span class="exchange-widget__select-label">Currencies to rate</span>
              </template>

              <template slot="item" slot-scope="props">
                <span class="exchange-widget__select-item">{{ props.item }}</span>
              </template>
            </v-select>
          </div>
        </div>

        <Table :thead="thead" :tbody="tbody" empty-body-msg="There are no currencies chosen!" />
      </div>

      <div class="exchange-widget__date-picker">
        <v-date-picker
          v-model="chosenDate"
          :allowed-dates="getAllowedDates"
          :first-day-of-week="1"
          full-width
          :landscape="!isMobile"
          show-current
          scrollable
          :month="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { State, Action } from "vuex-class";
import { Component, Mixins, Watch } from "vue-property-decorator";
import Table from "../Table/Table.vue";
import ResponsiveMixin from "../../mixins/ResponsiveMixin";
import { iTableCell } from "../../interfaces/table";
import { CURRENCIES } from "../../constants/currency";
import { FIRST_AVAILABLE_DATE } from "../../dictionaries/RATES";
import { toFixed } from "../../utils/number";

const [firstColWidth, secondColWidth, thirdColWidth] = [20, 30, 50];

@Component({
  components: { Table }
})
export default class ExchangeWidget extends Mixins(ResponsiveMixin) {
  baseCurrency: CURRENCIES = CURRENCIES.RUB;
  allCurrencies: Array<CURRENCIES> = Object.values(CURRENCIES);
  currenciesToRate: Array<CURRENCIES> = [];
  chosenDate: string = new Date().toISOString().substr(0, 10);
  firstAvailableDate: string = FIRST_AVAILABLE_DATE;

  @State("currenciesRates")
  currenciesRates: { [key in CURRENCIES]?: string };

  @State("error") error: string;

  @Action("setRates")
  setRates: (payload: {
    base: CURRENCIES;
    rates: Array<CURRENCIES>;
    date: Date;
  }) => Promise<void>;

  get thead(): Array<iTableCell> {
    return [
      { value: "", width: firstColWidth },
      { value: "Currency", width: secondColWidth },
      { value: "Value", width: thirdColWidth }
    ];
  }

  get tbody() {
    return Object.keys(this.currenciesRates).map(key => {
      if (key === this.baseCurrency) {
        return;
      }
      return [
        {
          value: `<svg width="20" height="20" fill="var(--color__blue)" viewBox="0 0 484 484">
          <use xlink:href="#${key}" />
        </svg>`,
          width: firstColWidth
        },
        { value: key, width: secondColWidth },
        {
          value: toFixed(this.currenciesRates[key as CURRENCIES], 3),
          width: thirdColWidth
        }
      ];
    });
  }

  async getExchangeRates() {
    if (!this.baseCurrency) {
      return;
    }

    const payload = {
      base: this.baseCurrency,
      rates: this.currenciesToRate,
      date: new Date(this.chosenDate)
    };

    await this.setRates(payload);
  }

  getAllowedDates(value: string) {
    return (
      new Date(value) >= new Date(FIRST_AVAILABLE_DATE) &&
      new Date(value) <= new Date()
    );
  }

  @Watch("chosenDate")
  onDateChange() {
    this.getExchangeRates();
  }

  @Watch("baseCurrency")
  onBaseCurrencyChange() {
    this.getExchangeRates();
  }

  @Watch("currenciesToRate")
  onCurrenciesToRateChange() {
    this.getExchangeRates();
  }
}
</script>

<style lang="scss" >
@import "../../styles/variables";

$table-min-width: 280px;

.exchange-widget {
  max-width: 1000px;
  padding: $offset--big 0;

  &__error {
    color: var(--color__orange);
  }

  &__currencies {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    min-height: 100px;
  }

  &__currency {
    max-width: 200px;
  }

  &__select-label {
    font-size: 2rem;
    color: var(--color__gray);
  }

  &__select-item {
    font-size: 2rem;
  }

  &__main {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__table {
    width: 100%;
    max-width: 450px;
    min-width: $table-min-width;
    margin-right: $offset--small;
  }

  &__date-picker {
    max-width: 450px;
    min-width: $table-min-width;
    margin-top: 100px;
  }
}
</style>