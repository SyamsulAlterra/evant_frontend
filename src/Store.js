import createStore from "unistore";

export let Store = createStore({
  baseUrl: "http://0.0.0.0:5000/api/",
  availableDates: ["dummy"],
  invitations: [],
  participants: [],
  place: [],
  eventName: "",
  category: "",
  startDate: "",
  endDate: "",
  duration: null
});

export const actions = Store => ({
  setAvailableDatesOnGlobal: (state, dates) => {
    return { availableDates: dates };
  },
  setInvitationsOnGlobal: (state, invitations) => {
    return { invitations: invitations };
  },
  setParticipantsOnGlobal: (state, participants) => {
    state.participants.push(participants);
  },
  clearParticipantsOnGlobal: () => {
    return { participants: [] };
  },
  removeParticipantOnGlobal: (state, input) => {
    let result = state.participants.filter(participant => {
      return participant !== input;
    });

    return { participants: result };
  },
  setEventNameGlobal: (state, input) => {
    return { eventName: input };
  },
  setCategoryGlobal: (state, input) => {
    return { category: input };
  },
  setStartDateGlobal: (state, input) => {
    return { startDate: input };
  },
  setEndDateGlobal: (state, input) => {
    return { endDate: input };
  },
  setDurationGlobal: (state, input) => {
    return { duration: input };
  },
  clearCreateEvent: state => {
    return {
      eventName: "",
      category: "",
      startDate: "",
      endDate: "",
      duration: null
    };
  },
  setPlaceOnGlobal: (state, input) => {
    return { place: input };
  }
});
