<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const API_URL = "http://localhost:8000/api/kompetisi";

const kompetisis = ref([]);
const isLoading = ref(false);
const totalResults = ref(0);
const page = ref(1);

const getAllKompetisi = async () => {
  isLoading.value = true;

  try {
    const { data } = await axios.get(API_URL);
    if (Array.isArray(data)) {
      kompetisis.value = data;
      totalResults.value = data.length;
    } else {
      throw new Error("No kompetisi found");
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const handleScroll = () => {
  const element = scrollComponent.value;
  if (element) {
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      page.value++;
      if (page.value <= Math.ceil(totalResults.value / 10)) {
        getAllKompetisi();
      }
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  getAllKompetisi();
});
</script>

<template>
  <main>

    <article ref="scrollComponent">
      <div v-for="kompetisi in kompetisis" :key="kompetisi.id" class="kompetisi-item">
        <div class="w-full h-48 rounded-md overflow-hidden bg-gray-50 lg:h-64">
          <router-link :to="{ name: 'Details', params: { id: kompetisi.id } }" class="w-full h-full">
            <div v-if="kompetisi.foto_poster" class="w-full h-full">
              <img :src="kompetisi.foto_poster" class="w-full h-full object-cover" :alt="kompetisi.nama_kompetisi" />
            </div>
            <div v-else>
              <img src="../assets/no-image.png" class="w-full h-full object-cover" :alt="kompetisi.nama_kompetisi" />
            </div>
          </router-link>
        </div>
        <div class="mt-4 w-full">
          <div class="text-red-200 flex items-center justify-between">
            <router-link :to="{ name: 'Details', params: { id: kompetisi.id } }">
              <h3 class="font-medium text-md tracking-wide" :title="kompetisi.nama_kompetisi">{{ kompetisi.nama_kompetisi }}</h3>
              <span class="text-gray-500">|</span>
              <span class="text-gray-500">Biaya Pendaftaran: {{ kompetisi.biaya_pendaftaran }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </article>
    <IsLoading v-if="isLoading" />
  </main>
</template>

<style scoped>
.kompetisi-item {
  margin-bottom: 20px; /* Atur jarak antar item kompetisi */
}
</style>