import { defineStore } from 'pinia'

//store access token
//store queuejson data

export const useTrackStore = defineStore('clickedTrack', {
    state: () => {
      return { track: "" } //this value is only updated in authorizationMethods
    },
    actions: {
        setTrack(trackName:string){
            this.track=trackName
        }
    }
  })
