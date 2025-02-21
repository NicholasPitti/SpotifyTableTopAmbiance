import { defineStore } from 'pinia'
import { getPlaylistItems,type Playlist } from '../components/spotifyMethods/playlistMethods';

//store access token
//store queuejson data

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
/*
    export const useCounterStore = defineStore('clickedPlaylist', () => {
      //const playlist = ref<Playlist|null>(null);
      const playlistId=ref('')
      const accessToken=localStorage.getItem('access_token')

      function setPlaylistId(newPlaylistId:string|null){
        if(newPlaylistId){
          playlistId.value=newPlaylistId
        }  
      }
      const playlist = computed(()=>{
        playlist.value = await getPlaylistItems(accessToken, playlist);
      })
    
      return { playlist,setPlaylistId,setPlaylist }
    })
      */