<script setup lang="ts">

defineProps<{
  msg: string
}>()

//id=${'dropdown'+index}
</script>

<template>
    <label for="tabletop">Select playlist:</label>
    <select name="intensity" id={msg}>
        <optgroup label="Music Intensity">
            <option value="Light">1-Light</option>
            <option value="Adventure">2-Adventure</option>
            <option value="Sneak">3-Sneaky</option>
            <option value="Unknown">4-Unknown</option>
            <option value="Unrest">5-Unrest</option>
            <option value="Combat">6-Combat</option>
            <option value="Epic">7-Epic</option>
            <option selected value="None">None</option>
        </optgroup>
    </select>
</template>

<style scoped>

</style>
