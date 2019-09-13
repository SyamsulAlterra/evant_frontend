import createStore from "unistore";

export let Store = createStore({
  baseUrl: "http://0.0.0.0:5000/api/",
  availableDates: ["dummy"],
  invitations: []
});

export const actions = Store => ({
  setAvailableDatesOnGlobal: (state, dates) => {
    return { availableDates: dates };
  },
  setInvitationsOnGlobal: (state, invitations) => {
    return { invitations: invitations };
  }
});
