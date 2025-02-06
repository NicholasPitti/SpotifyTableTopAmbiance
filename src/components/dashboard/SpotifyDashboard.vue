<script setup lang="ts">
import ListPlayable from './ListPlayable.vue';
import SearchTrackWidget from './SearchTrackWidget.vue';
//import { useClientStore } from '@/stores/clientId';
import { useAccessTokenStore } from '@/stores/accessToken';
//const clientIdStore=useClientStore()
//const clientId=clientIdStore.storedClientId
const accesstokenStore=useAccessTokenStore();
const accessToken=accesstokenStore.storedToken;

import queueTracksData from '../../../public/queue-tracks.json' assert { type: 'json' }
interface QueueTracksData {
  queues: {
    [key: string]: string[];
  };
}
const typedQueueTracksData= queueTracksData.queues as unknown  as QueueTracksData;

const queueData=typedQueueTracksData.queues
const queueKeys:string[] = Object.keys(queueData);
console.log(queueKeys+accessToken)  
  /*
  const allQueues=queueKeys.map(key => queueData[key])
  allQueues.forEach(queue => {
    const qContainer = document.createElement("div")
    qContainer.setAttribute('id',`qContainer-${queue}`)
    qContainer.style.paddingBottom='1rem'
    document.getElementById("pl")?.appendChild(qContainer)
    queue.forEach(trackID => {
    //queueTrackDraggable compent so li becomes draggable
    //might need to use h & render again
    const listElement = document.createElement("li")
    document.getElementById(`qContainer-${queue}`)?.appendChild(listElement)
    listElement.textContent = trackID
    //document.getElementById("qContainer")?.appendChild(listElement)
    ///addToQueue(accessToken,trackID)  //l33t
    });
  });
 */ 


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
<p>{{accessToken}}</p>
<SearchTrackWidget></SearchTrackWidget>
<ListPlayable></ListPlayable>
  
  </div>
</template>

<style scoped>

</style>
