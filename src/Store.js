import createStore from "unistore";

const today = new Date();
const oneDayLapse = 24 * 3600 * 1000;
const tomorrow = new Date(today.getTime() + oneDayLapse);
const dayAfterTomorrow = new Date(today.getTime() + 2 * oneDayLapse);

export let Store = createStore({
  baseUrl: "https://api.myevant.com/api/",
  availableDates: ["dummy"],
  invitations: [],
  participants: [],
  place: [],
  eventName: "My Event",
  category: "vacation",
  startDate: tomorrow,
  endDate: dayAfterTomorrow,
  duration: null,
  events: [],
  allBookedDates: [],
  verboseCategory: {
    vacation: "Holiday",
    eat: "Eat Out",
    hiking: "Hiking"
  },
  preference: ""
});

export const actions = Store => ({
  setPreferenceOnGlobal: (state, preference) => {
    return { preference: preference };
  },
  setEventsAndBookedDatesOnGlobal: (state, events, bookedDate) => {
    return { events: events, allBookedDates: bookedDate };
  },
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
      eventName: "My Event",
      category: "vacation",
      startDate: tomorrow,
      endDate: dayAfterTomorrow,
      duration: null
    };
  },
  setPlaceOnGlobal: (state, input) => {
    return { place: input };
  }
});
