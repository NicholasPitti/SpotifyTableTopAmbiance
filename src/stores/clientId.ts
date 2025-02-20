// stores/counter.js
import { defineStore } from 'pinia'

//object that has state and action
//import clientId from '../../public/clientId.json' assert { type: 'json' }

async function loadClientId() {
  const response = await fetch('/clientId.json');
  const data = await response.json(); //deserialize
  return data;
}

const typedClientId:string=await loadClientId().then(clientData => {
  return clientData["clientID"];
});

//const typedClientId:string=""
//console.log(typedClientId)

export const useClientStore = defineStore('storedClientId', {
  state: () => {
    return { storedClientId: typedClientId } //this value is only updated in authorizationMethods
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