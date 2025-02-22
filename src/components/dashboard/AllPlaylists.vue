<script setup lang="ts">

import {getPlaylistCollection,type PlaylistCollection} from '../spotifyMethods/playlistMethods'
import {ref} from  'vue'
import {usePlaylistStore} from '../../stores/clickedPlaylist'
import { SearchOutlined } from "@ant-design/icons-vue"; //https://2x.antdv.com/components/icon
const accessToken = localStorage.getItem('access_token')
const store = usePlaylistStore()

console.log(accessToken)

// populateWithPlaylistCollection
//playlist:PlaylistCollection)

//called once, if updates are made in spotify app => refresh would be needed
const playlists=ref<PlaylistCollection>(await getPlaylistCollection(accessToken))


/*
  ///duplicate"  =   ///get all playlists
      //Name form
      const newPlaylist=await duplicatePlaylist(accessToken,"newPlaylistTest",playlistItems.items)
          const newplaylistItems = await getPlaylistItems(accessToken, newPlaylist.id)
          populateWithPlaylist(accessToken, newplaylistItems)
+++++++++++++++++
        const playlists=await getPlaylistCollection(accessToken)
        console.log("@@@@ before populate playlists :"+playlists)
        populateWithPlaylistCollection(accessToken, playlists)
*/

function getPlaylistId(url:string|null) {
        const regex = /\/playlists\/([^/?]+)/
        const match = url?.match(regex)
        return match ? match[1] : null
 }

</script>

<template>
    <div class="my-1">
        <div  v-for="(item,index) in playlists?.items" :key="index">
          <button class="mr-1" @click=(store.setPlaylist(getPlaylistId(item.href)))><SearchOutlined /></button>
          <span>
              {{item.name}}-{{item.href}}
            </span> 
        </div>
    </div>
    <button>Duplicate Playlist</button>
</template>

<style scoped>
ul{
  padding:0;
}
button {
  font-weight: bold;
  border-radius: 0.5rem;
}

select {
  border-radius: 0.5rem;
}

</style>
