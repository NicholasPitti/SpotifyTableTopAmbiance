import { defineStore } from 'pinia'
//if the store is responsible for triggering api call
//that would only be due to the fact that the listplaylist component doesnt have a search button
//although I could use a refresh button


//this doesnt store a playlist object but rather a playlistId
export const usePlaylistStore = defineStore('clickedPlaylist', {
  state: () => {
    return { playlist: "" } //this value is only updated in authorizationMethods
  },
  actions: {
      setPlaylist(playlistId:string|null){
        if(playlistId){
          this.playlist=playlistId
        }  
      },


    }
  })