<script setup lang="ts">
import { ref } from 'vue';

//resolves issue where store only displays initialized value

import App from '../../App.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)


import { useTrackStore } from '../../stores/clickedTrack'
const store = useTrackStore()
// Now you can use store.count, store.doubleCount, and store.increment()

// give each todo a unique id
let id = 0

const newTodo = ref('')
const todos = ref([
  { id: id++, text: 'Learn HTML' },
  { id: id++, text: 'Learn JavaScript' },
  { id: id++, text: 'Learn Vue' }
])

function addTrackName() {
  store.track=newTodo.value
    todos.value.push({ id: id++, text: store.track.toString() })
    newTodo.value = ''
}

function addTodo() {
    todos.value.push({ id: id++, text: store.track.toString() })
    newTodo.value = ''
}

function removeTodo(todo:{ id: number; text: string; }) {
    todos.value = todos.value.filter((t) => t !== todo)
}


</script>

<template>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" required placeholder="new todo">
      <button>Add Todo</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span @click="addTrackName">{{ todo.text }}</span>
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
  </template>

 <style scoped >

</style>