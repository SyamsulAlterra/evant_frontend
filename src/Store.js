import createStore from "unistore";

export let Store = createStore({
  tes: "tes",
  monthReference: "Januari",
  yearReference: 2017,
  leapYearStatus: 0,
  totalLeapYear: 0,
  baseUrl: "http://0.0.0.0:5000/api/"
});

export const actions = Store => ({});
