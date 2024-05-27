<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_URL = "http://localhost:8000/api/kompetisi";
const kompetisis = ref([]);
const isLoading = ref(false);

const fetchKompetisiByIds = async (ids) => {
  try {
    const requests = ids.map(id => axios.get(`${API_URL}/${id}`));
    const responses = await Promise.all(requests);
    kompetisis.value = responses.map(response => {
      console.log('Response for ID:', response.data);
      return response.data;
    });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  isLoading.value = true;
  const storedIds = JSON.parse(localStorage.getItem('favorite_kompetisi') || '[]');
  console.log('Stored IDs:', storedIds); // Log the stored IDs

  if (storedIds.length > 0) {
    fetchKompetisiByIds(storedIds).then(() => {
      console.log('Fetched Kompetisi:', kompetisis.value); // Log the fetched data
    });
  } else {
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <article>
      <div v-if="isLoading" class="text-center">
        Loading...
      </div>
      <div v-if="!isLoading && kompetisis.length === 0" class="text-center" style="color:white">
        No competitions found.
      </div>
      <div v-else>
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
            <div class="text-gray-800 flex items-center justify-between">
              <router-link :to="{ name: 'Details', params: { id: kompetisi.id } }">
                <h3 class="font-medium text-md tracking-wide" :title="kompetisi.nama_kompetisi">{{ kompetisi.nama_kompetisi }}</h3>
                <span class="text-gray-500">|</span>
                <span class="text-gray-500">Biaya Pendaftaran: {{ kompetisi.biaya_pendaftaran }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </article>
  </main>
</template>

<style scoped>
.kompetisi-item {
  margin-bottom: 20px; /* Adjust the space between competition items */
}
</style>