<template>
  <div>
    {{ post }}
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

</script>