<script setup>
import { defineProps } from "vue";
import { useMoviesStore } from "../store/movies";

const moviesStore = useMoviesStore();

const props = defineProps({
  id: String,
});

const movie = moviesStore.movies.find(movie => movie.id === props.id);
</script>

<template>
  <main>
    <IsLoading v-if="moviesStore.isLoading" />
    <article class="lg:flex lg:gap-5 lg:justify-between lg:items-center">
      <div class="w-full h-64 rounded-md overflow-hidden md:h-80 lg:w-6/12 lg:h-96">
        <img :src="movie.posterpath" class="w-full h-full object-cover" :alt="movie.title" />
      </div>
      <div class="my-5 lg:w-5/12 lg:mt-0">
        <h3 class="my-8 font-medium text-lg text-gray-200 tracking-wider md:text-2xl">{{ movie.title }}</h3>
      </div>
    </article>
  </main>
</template>

<style>
</style>