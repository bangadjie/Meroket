<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4" style="color:white">Edit Competition</h1>
    <form @submit.prevent="updateCompetition" class="form-container">
      <div class="form-group">
        <label for="nama-kompetisi" class="text-gray-800">Nama Kompetisi:</label>
        <input type="text" class="form-control" id="nama-kompetisi" v-model="competition.nama_kompetisi" required>
      </div>
      <div class="form-group">
        <label for="deskripsi" class="text-gray-800">Deskripsi:</label>
        <textarea class="form-control" id="deskripsi" v-model="competition.deskripsi" required></textarea>
      </div>
      <div class="form-group">
        <label for="kategori" class="text-gray-800">Kategori:</label>
        <select class="form-control" id="kategori" v-model="competition.kategori" required>
          <option value="desain">Desain</option>
          <option value="programming">Programming</option>
          <option value="robotic">Robotic</option>
          <option value="CTF">CTF</option>
        </select>
      </div>
      <div class="form-group">
        <label for="biaya-pendaftaran" class="text-gray-800">Biaya Pendaftaran:</label>
        <input type="number" class="form-control" id="biaya-pendaftaran" v-model="competition.biaya_pendaftaran" required>
      </div>
      <div class="form-group">
        <label for="foto-poster" class="text-gray-800">Foto Poster (URL):</label>
        <input type="text" class="form-control" id="foto-poster" v-model="competition.foto_poster">
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const competition = ref({
  id: route.params.id,
  nama_kompetisi: '',
  deskripsi: '',
  kategori: '',
  biaya_pendaftaran: '',
  foto_poster: ''
});

onMounted(async () => {
  await fetchCompetition();
});

const fetchCompetition = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/kompetisi/${competition.value.id}`);
    Object.assign(competition.value, response.data);
  } catch (error) {
    console.error('Error fetching competition:', error);
  }
};

const updateCompetition = async () => {
  try {
    await axios.put(`http://localhost:8000/api/kompetisi/update/${competition.value.id}`, {
      nama_kompetisi: competition.value.nama_kompetisi,
      deskripsi: competition.value.deskripsi,
      kategori: competition.value.kategori,
      biaya_pendaftaran: competition.value.biaya_pendaftaran,
      foto_poster: competition.value.foto_poster
    });
    router.push('/admin');
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

.form-container {
  width: 100%;
  padding: 30px;
  border-radius: 5px;
  background-color: #f4f4f4;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 100%;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>