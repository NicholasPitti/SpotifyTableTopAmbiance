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

</script>

<template>
  <div class="">

<ToolContainer title="All Playlists">
  <AllPlaylists></AllPlaylists>
</ToolContainer>

<Suspense>
  <ToolContainer title="Playlist">
  <ListPlayable  :likes=false></ListPlayable>
  </ToolContainer>
</Suspense>

<Suspense>
  <ToolContainer title="Likes">
  <ListPlayable  :likes=true></ListPlayable>
  </ToolContainer>
</Suspense>

<ToolContainer title="Search">
  <SearchTrackWidget ></SearchTrackWidget>
</ToolContainer>

<Suspense>
  <ToolContainer title="Saved Qeuues">
<SavedQueues :queues="queueValueRef.queues"></SavedQueues>
  </ToolContainer>
</Suspense>

<ToolContainer title="New Queues">
  <NewQueues></NewQueues>
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
