import Vue from "vue";
import Vuex from "vuex";
import { getExchangeRates } from "../providers/getExchangeRates";
import { CURRENCIES } from "../constants/currency";
import { ActionContext } from "vuex";

Vue.use(Vuex);

interface iState {
  currenciesRates: { [key in CURRENCIES]?: string };
  inProgress: boolean;
  error: string;
}

export const getInitialState = (): iState => ({
  currenciesRates: {},
  inProgress: false,
  error: ""
});

export const mutationsTypes = {
  SET_RATES: "SET_RATES",
  SET_RATES_OK: "SET_RATES_OK",
  SET_RATES_FAIL: "SET_RATES_FAIL"
};

export const mutations = {
  [mutationsTypes.SET_RATES](state: iState) {
    state.inProgress = true;
  },

  [mutationsTypes.SET_RATES_OK](
    state: iState,
    rates: { [key in CURRENCIES]?: string }
  ) {
    state.currenciesRates = rates;
    state.inProgress = false;
  },

  [mutationsTypes.SET_RATES_FAIL](state: iState, error: string) {
    state.error = error;
    state.inProgress = false;
  }
};

export const actions = {
  async setRates(
    store: ActionContext<iState, any>,
    payload: {
      base: CURRENCIES;
      rates: Array<CURRENCIES>;
      date: Date;
    }
  ) {
    store.commit(mutationsTypes.SET_RATES);

    if (payload.rates.length === 0) {
      store.commit(mutationsTypes.SET_RATES_OK, {});

      return;
    }

    try {
      const { rates } = await getExchangeRates(
        payload.base,
        payload.rates,
        new Date(payload.date)
      );

      store.commit(mutationsTypes.SET_RATES_OK, rates);
    } catch (e) {
      store.commit(
        mutationsTypes.SET_RATES_FAIL,
        "Something went wrong. Try again!"
      );
    }
  }
};

export default new Vuex.Store({
  state: getInitialState(),
  mutations,
  actions
});
