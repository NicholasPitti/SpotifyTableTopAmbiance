<script setup lang="ts">
//import ListPlayable from './ListPlayable.vue';
import {ref} from 'vue'
import SearchTrackWidget from './SearchTrackWidget.vue';
import SavedQueues from './SavedQueues.vue';
import queueTracksData from '../../../public/queue-tracks.json' with { type: 'json' }
import ListPlayable from './ListPlayable.vue';
import NewQueues from './NewQueues.vue';
import AllPlaylists from './AllPlaylists.vue';
import ToolContainer from './ToolContainer.vue';
interface QueueTracksData {
  queues: {
    [key: string]: {trackName:string,trackId:string }[];
  };
}

const typedQueueTracksData= queueTracksData as unknown  as QueueTracksData;
const queueValueRef = ref<QueueTracksData>(typedQueueTracksData);




//const accessToken=localStorage.getItem('access_token')



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

        <Suspense>
<ListPlayable id="1rjqDQFGg6K6KGb72Du7n9"></ListPlayable>
</Suspense>



   */ 

</script>

<template>
  <div class="">

<Suspense>
  <ToolContainer title="Saved Qeuues">
<SavedQueues :queues="queueValueRef.queues"></SavedQueues>
  </ToolContainer>
</Suspense>

<ToolContainer title="New Queues">
  <NewQueues></NewQueues>
</ToolContainer>
  
<ToolContainer title="All Playlists">
  <AllPlaylists></AllPlaylists>
</ToolContainer>

<Suspense>
  <ToolContainer title="Playlist">
  <ListPlayable  id="1rjqDQFGg6K6KGb72Du7n9"></ListPlayable>
  </ToolContainer>
</Suspense>

<ToolContainer title="Search">
  <SearchTrackWidget ></SearchTrackWidget>
</ToolContainer>
  
  </div>
</template>

<style scoped>
.view-container{
    border:solid;
    border-width: 0.1rem;
    border-color:#fff;
    background-color:#1e1e1e;
    color:#706752;
    padding:0.5rem;
}
</style>
