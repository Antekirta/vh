import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { getInitialState } from "../../store/store";
import ExchangeWidget from "./ExchangeWidget.vue";
import { CURRENCIES } from "../../constants/currency";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Test suite for ExchangeWidget", () => {
  let state, actions, store, wrapper;

  beforeEach(() => {
    state = getInitialState();

    actions = {
      setRates: jest.fn()
    };
    store = new Vuex.Store({
      state,
      actions
    });
  });

  beforeEach(() => {
    wrapper = shallowMount(ExchangeWidget, {
      store,
      localVue
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Should request for data when the corresponding method is called", () => {
    jest.spyOn(wrapper.vm, "setRates");

    wrapper.vm.getExchangeRates();

    expect(wrapper.vm.setRates).toHaveBeenCalled();
  });

  it("Should update when base currency is changed", () => {
    jest.spyOn(wrapper.vm, "getExchangeRates");

    wrapper.setData({
      baseCurrency: CURRENCIES.USD
    });

    expect(wrapper.vm.getExchangeRates).toHaveBeenCalled();
  });

  it("Should update when currencies to rate are changed", () => {
    jest.spyOn(wrapper.vm, "getExchangeRates");

    wrapper.setData({
      currenciesToRate: [CURRENCIES.USD, CURRENCIES.INR]
    });

    expect(wrapper.vm.getExchangeRates).toHaveBeenCalled();
  });

  it("Should update when date is changed", () => {
    jest.spyOn(wrapper.vm, "getExchangeRates");

    wrapper.setData({
      chosenDate: "2019-10-09"
    });

    expect(wrapper.vm.getExchangeRates).toHaveBeenCalled();
  });

  it("Should restrict dates range", () => {
    const { getAllowedDates } = wrapper.vm;

    expect(getAllowedDates("2005-12-12")).toBe(false);
    expect(getAllowedDates("2006-01-01")).toBe(true);

    const currentDate = new Date();

    expect(getAllowedDates(currentDate.toString())).toBe(true);

    const tomorrow = currentDate;
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(getAllowedDates(tomorrow.toString())).toBe(false);
  });
});
