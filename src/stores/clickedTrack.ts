import { defineStore } from 'pinia'

//store access token
//store queuejson data

export const useTrackStore = defineStore('clickedTrack', {
    state: () => {
      return { tracks: [] as {trackName: string,trackId: string }[] } //this value is only updated in authorizationMethods
    },
    actions: {
        addTrack(trackName:string,trackId:string) {
          this.tracks.push({ trackName: trackName, trackId:trackId })
        },
        removeTrack(removedTrack:{ trackName: string, trackId: string }) {
            this.tracks = this.tracks.filter((t) => t !== removedTrack)
        }
    }
  })
