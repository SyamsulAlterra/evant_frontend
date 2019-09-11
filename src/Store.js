import createStore from "unistore";

export let Store = createStore({
  loginStatus: false,
  username: "",
  password: "",

  userSignUp: "",
  email: "",
  passwordSignUp: "",
  confirmPassword: "",

  searchList: [],
  searchText: "",
  itemInBag: 0,
  baseUrl: "https://api.syamsul.club"
});
export const actions = () => ({
  setItemInBag(state, num) {
    return { itemInBag: num };
  },
  setSearchText(state, t) {
    return { searchText: t };
  },
  setSearchList(state, list) {
    return { searchList: list };
  },
  setLoginStatus(state, status) {
    return { loginStatus: status };
  },
  setUserName(state, name) {
    return { username: name };
  },
  setPassword(state, pass) {
    return { password: pass };
  },

  setUserSignUp(state, name) {
    return { userSignUp: name };
  },
  setEmail(state, em) {
    return { email: em };
  },
  setPasswordSignUp(state, pass) {
    return { passwordSignUp: pass };
  },
  setConfirmPassword(state, pass) {
    return { confirmPassword: pass };
  }
});
