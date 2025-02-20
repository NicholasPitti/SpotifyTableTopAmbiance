<script setup lang="ts">
//import ListPlayable from './ListPlayable.vue';
import {ref} from 'vue'
import SearchTrackWidget from './SearchTrackWidget.vue';
import SavedQueues from './SavedQueues.vue';
import queueTracksData from '../../../public/queue-tracks.json' with { type: 'json' }
import { addToQueue } from '../spotifyMethods/playbackMethods';
import { storeToRefs } from 'pinia';
import { useAccessTokenStore } from '@/stores/accessToken';
import ListPlayable from './ListPlayable.vue';
import NewQueues from './NewQueues.vue';

//required for accessToken store
import App from '../../App.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const {storedToken}=storeToRefs(useAccessTokenStore());
//const accesstokenStore=useAccessTokenStore();
//const accessToken=accesstokenStore.storedToken;
//console.log(storedToken.value)

interface QueueTracksData {
  queues: {
    [key: string]: {trackName:string,trackId:string }[];
  };
}

const typedQueueTracksData= queueTracksData as unknown  as QueueTracksData;
//const queueData=typedQueueTracksData.queues

////const queueValues:string[] = Object.values(typedQueueTracksData)[0];

//const [queueNames,queueValues]:string[][] = [Object.keys(typedQueueTracksData),Object.values(typedQueueTracksData)];
//const queueValueRef = ref<string[][]>([queueNames,queueValues]);


////const queueNames =Object.keys(typedQueueTracksData);
////const queueValues =Object.values(typedQueueTracksData)
////const queueValueRef = ref<string[][]>(queueValues);
////const queueNamesRef = ref<string[]>(queueNames);
const queueValueRef = ref<QueueTracksData>(typedQueueTracksData);



/////console.log(queueValueRef.value.queues.q1)


  //#const queueValueRef = ref<string[][]>(typedQueueTracksData);
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

  //add tracks in preliminaryQ object to new Q
function queueTracks(){
  //tracks to queue need to be emitted by the queuelist dropdown selection
  const tracksToQueue=["16obHUJN0KaqVyCaV3GwFX",
"16obHUJN0KaqVyCaV3GwFX"]
  tracksToQueue.forEach(element => {
    addToQueue(storedToken.value,element)  
  });
}


</script>

<template>
  <div class="">

<SearchTrackWidget ></SearchTrackWidget>

<Suspense>
  <div class="">
<SavedQueues :queues="queueValueRef.queues"></SavedQueues>
<span>
  <button @click="queueTracks">Queue Tracks</button>
</span>
</div>
</Suspense>

<Suspense>
  <ListPlayable  id="1rjqDQFGg6K6KGb72Du7n9"></ListPlayable>
</Suspense>

<NewQueues></NewQueues>
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
