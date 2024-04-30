<script setup>
import { defineProps } from "vue";

const props = defineProps({
  movie: Object,
});
</script>

<template>
  <div class="w-full h-48 rounded-md overflow-hidden bg-gray-50 lg:h-64">
    <router-link :to="{ name: 'Details', params: { id: movie.id } }" class="w-full h-full">
      <div v-if="movie.posterpath" class="w-full h-full">
        <img :src="movie.posterpath" class="w-full h-full object-cover" :alt="movie.title" />
      </div>
      <div v-else>
        <img src="../assets/no-image.png" class="w-full h-full object-cover" :alt="movie.title" />
      </div>
    </router-link>
  </div>

  <div class="mt-4 w-full">
    <div class="text-red-200 flex items-center justify-between">
      <router-link :to="{ name: 'Details', params: { id: movie.id } }">
        <center>
        <h3 class="font-medium text-md tracking-wide" :title="movie.title">{{ movie.title }}</h3>
        </center>
      </router-link>
    </div>
  </div>
</template>
