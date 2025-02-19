// stores/counter.js
import { defineStore } from 'pinia'
//import { redirectToAuthCodeFlow } from '../components/spotifyMethods/authorizationMethods'


//import { useClientStore } from './clientId'
//object that has state and action
//const clientId=useClientStore()


export const useAccessTokenStore = defineStore('accessToken', {
  state: () => {
    return { storedToken: "" } //this value is only updated in authorizationMethods
  },
  actions: {
    async getToken() {
      // If the token is already stored, return it
      if (this.storedToken) {
        return this.storedToken;
      }
    /*
    async initializeAuth() { //this only ever needs to be called on refresh
      
      const verifier = localStorage.getItem('verifier')
      if (verifier) {
        try {
          await redirectToAuthCodeFlow(clientId.storedClientId)
          //redirects to the localhost/callback
          //this will use the existing verifier to get a new access token
          //access tokens are stored in accessToken.ts store from auth methods
          //therefore its enough to just redirect to the callback when you need an accessToken
        } catch (error) {
          console.error('Store couldnt retrieve access token:', error)  
        }
      }
    }
*/
    }
  }
})

/*
async checkAndGetAccessToken(){ //refreshing an api call while no acces Token will trigger this.. is there a way to pause that like a modal subroutine?
      if(this.token===0){
        await  this.reAuthenticateToken; //call method of this object
      }
    },
    async reAuthenticateToken(){
      await
      redirectToAuthCodeFlow(clientId);//get verifier
      //updat token after getting verifier
      this.token = 1
    }
*/