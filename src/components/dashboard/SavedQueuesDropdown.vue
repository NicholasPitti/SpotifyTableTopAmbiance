<script setup lang="ts">
//import { ref } from 'vue';


defineProps<{
  existingQueues: string[];
  modelValue:string;
}>();
//const props = defineProps(['existingQueues']);

//const emit = defineEmits(['update:modelValue', 'change']);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
  emit('change', target.value);
};

//const selectedIndex = ref(0);

//id=${'dropdown'+index}
</script>

<template>
    <label for="queue" class="mr">Queue Name:</label>
    <select name="queue select"  @change="updateValue" :value="modelValue">
        <optgroup v-for="(item,index) in existingQueues" :key="index">
            <option :value="index">{{ item }}</option>
        </optgroup>
    </select>
</template>

<style scoped>
    .mr{
        margin-right: 0.5rem;
        font-weight:bold;
    }
</style>
