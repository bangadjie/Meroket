<script setup>
import { defineProps, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"; // Impor useRouter

const props = defineProps({
  id: String,
});

const kompetisiDetail = ref(null);
const router = useRouter(); // Inisialisasi router

// Fungsi untuk memuat detail kompetisi berdasarkan ID
const loadKompetisiDetail = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/kompetisi/${props.id}`);
    kompetisiDetail.value = response.data;
  } catch (error) {
    console.error("Failed to load kompetisi detail:", error);
  }
};

// Memanggil fungsi untuk memuat detail kompetisi saat komponen dimuat
import { onMounted } from "vue";
onMounted(loadKompetisiDetail);

const daftarKompetisi = () => {
  // Arahkan pengguna ke halaman /daftar dengan menyertakan properti id
  router.push({ path: `/daftar/${props.id}` });
};
</script>

<template>
  <main>
    <IsLoading v-if="!kompetisiDetail" />
    <article v-if="kompetisiDetail" class="lg:flex lg:gap-5 lg:justify-between lg:items-center">
      <div class="w-full h-64 rounded-md overflow-hidden md:h-80 lg:w-6/12 lg:h-96">
        <img :src="kompetisiDetail.foto_poster" class="w-full h-full object-cover" :alt="kompetisiDetail.nama_kompetisi" />
      </div>
      <br>
      <div class="my-5 lg:w-5/12 lg:mt-0">
        <h3 class="my-8 font-medium text-lg text-gray-200 tracking-wider md:text-2xl">{{ kompetisiDetail.nama_kompetisi }}</h3>
        <p class="text-gray-300">{{ kompetisiDetail.deskripsi }}</p>
        <br>
        <p class="text-gray-300">Kategori: {{ kompetisiDetail.kategori }}</p>
        <br>
        <p class="text-gray-300">Biaya Pendaftaran: {{ kompetisiDetail.biaya_pendaftaran }}</p>
        <br><br>
        <button class="daftar-btn" @click="daftarKompetisi">Daftar</button>
      </div>
    </article>
  </main>
</template>

<style>
.daftar-btn {
  border: 2px solid white;
  color: white;
  background-color: transparent;
  padding: 10px 20px;
  width: 100%;
  max-width: 100%;
  cursor: pointer;
}

.daftar-btn:hover {
  background-color: white;
  color: black;
}
</style>