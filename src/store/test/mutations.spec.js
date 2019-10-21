import { mutationsTypes, mutations } from "../store";

describe("Test suite for mutations", () => {
  it(`${mutationsTypes.SET_RATES} mutation should set inProgress in true`, () => {
    const state = {
      inProgress: false
    };

    mutations[mutationsTypes.SET_RATES](state);

    expect(state.inProgress).toBe(true);
  });

  it(`${mutationsTypes.SET_RATES_OK} mutation should set inProgress in false and set rates`, () => {
    const state = {
      inProgress: true,
      currenciesRates: {}
    };

    mutations[mutationsTypes.SET_RATES_OK](state, { USD: "42" });

    expect(state.inProgress).toBe(false);
    expect(state.currenciesRates).toEqual({ USD: "42" });
  });

  it(`${mutationsTypes.SET_RATES_FAIL} mutation should set inProgress in false and set error`, () => {
    const state = {
      inProgress: true,
      error: ""
    };

    mutations[mutationsTypes.SET_RATES_FAIL](state, "Something went wrong");

    expect(state.inProgress).toBe(false);
    expect(state.error).toBe("Something went wrong");
  });
});
