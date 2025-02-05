// stores/counter.js
import { defineStore } from 'pinia'

export const useAccessTokenStore = defineStore('accessToken', {
  state: () => {
    return { accessToken: 0 }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  /*
  actions: {
    increment() {
      this.count++
    },
    */
  },
})