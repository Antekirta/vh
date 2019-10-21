import axios from "axios";
import { mutationsTypes, mutations, actions } from "../store";
import { CURRENCIES } from "../../constants/currency";

describe("Test suite for actions", () => {
  let store;

  beforeEach(() => {
    store = {
      commit: () => {}
    };

    jest.spyOn(store, "commit");
  });

  it(`Should call ${mutationsTypes.SET_RATES} mutation immediately`, () => {
    const payload = {
      base: CURRENCIES.USD,
      rates: [CURRENCIES.RUB, CURRENCIES.INR],
      date: new Date()
    };

    actions.setRates(store, payload);

    expect(store.commit).toHaveBeenCalledWith(mutationsTypes.SET_RATES);
  });

  it(`Should call ${mutationsTypes.SET_RATES_OK} mutation with {} if there is no rates provided`, () => {
    const payload = {
      base: CURRENCIES.USD,
      rates: [],
      date: new Date()
    };

    actions.setRates(store, payload);

    expect(store.commit).toHaveBeenCalledWith(mutationsTypes.SET_RATES_OK, {});
  });

  it(`Should call ${mutationsTypes.SET_RATES_OK} mutation with rates from BE`, async () => {
    const payload = {
      base: CURRENCIES.USD,
      rates: [CURRENCIES.RUB],
      date: new Date()
    };

    const resultRates = {
      data: {
        rates: {
          [CURRENCIES.RUB]: 50
        }
      }
    };

    axios.get.mockImplementation(() => Promise.resolve(resultRates));

    await actions.setRates(store, payload);

    expect(store.commit).toHaveBeenCalledTimes(2);

    expect(store.commit.mock.calls[1]).toEqual([
      mutationsTypes.SET_RATES_OK,
      resultRates.data.rates
    ]);
  });

  it(`Should call ${mutationsTypes.SET_RATES_FAIL} mutation if BE request did not succeed`, async () => {
    const payload = {
      base: CURRENCIES.USD,
      rates: [CURRENCIES.RUB],
      date: new Date()
    };

    axios.get.mockImplementation(() => Promise.reject());

    await actions.setRates(store, payload);

    expect(store.commit).toHaveBeenCalledTimes(2);

    expect(store.commit.mock.calls[1]).toEqual([
      mutationsTypes.SET_RATES_FAIL,
      "Something went wrong. Try again!"
    ]);
  });
});
