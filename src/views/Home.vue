<script setup>
import { onMounted, ref } from "vue";
import Movies from "../components/Movies.vue";
import Search from "../components/Search.vue";
import IsLoading from "../components/IsLoading.vue";
import { useMoviesStore } from "../store/movies";

const store = useMoviesStore();
const scrollComponent = ref(null);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  store.getAllMovies();
});

const getAllMovies = async () => {
  try {
    await store.getAllMovies();
    // Hitung totalPage setelah data diambil
    totalPage.value = Math.ceil(store.totalResults / 10);
  } catch (error) {
    console.error(error);
  }
};

const totalPage = ref(0);

const handleScroll = () => {
  const element = scrollComponent.value;
  if (element) {
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      store.page++;
      if (store.page <= totalPage.value) {
        store.nextPage(store.page);
      }
    }
  }
};
</script>

<template>
  <main>
    <Search />

    <article ref="scrollComponent">
      <Movies :movies="store.movies" />
    </article>
    <IsLoading v-if="store.isLoading" />
  </main>
</template>