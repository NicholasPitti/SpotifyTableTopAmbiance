<script setup lang="ts">
import ListPlayable from './ListPlayable.vue';
import SearchTrackWidget from './SearchTrackWidget.vue';

/*


  ///search >>> not an essential component right now
  // ///### using name ..no artist?
         const track=await searchTrack(accessToken,"3's & 7's","Queens of the Stone Age")
         populateWithQueryResponse(accessToken, track)   

  ///get all likes
         //explicit false not neccesary?
         populateWithPlaylist(accessToken, likes,false)
      


  ///q
      // get users q

        //populateWithQueueOptions(accessToken)
        //add to queue (file)
         //need a button to confirm adding a trk to a queue
         //queue doesnt exist then create it
         //list existing

  ///srt
        //populateWithPlaylist(accessToken, playlistItems,true)
      

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

</script>

<template>
  <div class="">
<p>{{counter.count}}</p>
<SearchTrackWidget></SearchTrackWidget>
<ListPlayable></ListPlayable>
  
  </div>
</template>

<style scoped>

</style>
