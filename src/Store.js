import createStore from "unistore";

export let Store = createStore({
  tes: "tes",
  monthReference: "Januari",
  yearReference: 2017,
  leapYearStatus: 0,
  totalLeapYear: 0
});

export const actions = Store => ({});
