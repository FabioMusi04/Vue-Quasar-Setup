import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    isLoggedIn: false,
    username: '',
    password: '',
  }),
  getters: {
    getIsLoggedIn() {
      return this.isLoggedIn;
    },
    getUsername() {
      return this.username;
    },
    getPassword() {
      return this.password;
    },
  },
  actions: {
    login(username, password) {
      this.isLoggedIn = true;
      this.username = username;
      this.password = password;
    },
    logout() {
      this.isLoggedIn = false;
      this.username = '';
      this.password = '';
    },
  },
});
