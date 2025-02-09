<script setup lang="ts">
//import ListPlayable from './ListPlayable.vue';
import {ref} from 'vue'
import SearchTrackWidget from './SearchTrackWidget.vue';
import DisplayQueues from './DisplayQueues.vue';
import queueTracksData from '../../../public/queue-tracks.json' with { type: 'json' }
import { addToQueue } from '../spotifyMethods/playbackMethods';
import { useAccessTokenStore } from '@/stores/accessToken';
const accesstokenStore=useAccessTokenStore();
const accessToken=await accesstokenStore.storedToken;
//console.log(accessToken)


interface QueueTracksData {
  queues: {
    [key: string]: string[];
  };
}

const typedQueueTracksData= queueTracksData.queues as unknown  as QueueTracksData;
//const queueData=typedQueueTracksData.queues


const queueValues:string[] = Object.values(typedQueueTracksData)[0];
const queueValueRef = ref<string[]>(queueValues);
//console.log(Object.values(typedQueueTracksData)[0]) //array
//console.log(queueValueRef.value) // array


//console.log(queueKeys.value)
//import { useClientStore } from '@/stores/clientId';
//import { useAccessTokenStore } from '@/stores/accessToken';

//const clientIdStore=useClientStore()
//const clientId=clientIdStore.storedClientId

//const accesstokenStore=useAccessTokenStore();
//const accessToken=accesstokenStore.storedToken;


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
function addToCurrentQueue(){
  const tracksToQueue=["16obHUJN0KaqVyCaV3GwFX",
"16obHUJN0KaqVyCaV3GwFX"]
  tracksToQueue.forEach(element => {
    addToQueue(accessToken,element)  
  });
}


</script>

<template>
  <div class="">
<SearchTrackWidget ></SearchTrackWidget>

<Suspense>
<DisplayQueues :queues="queueValueRef"></DisplayQueues>
</Suspense>
<p>Selected queues are emited/computed to the dashboard as a parent</p>
<button @click="addToCurrentQueue">Add To Current Queue</button>
  </div>
</template>

<style scoped>

</style>
