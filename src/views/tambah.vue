<template>
  <div class="container d-flex justify-content-center align-items-center">
    <form @submit.prevent="submitForm" class="form-container">
      <h2 class="text-white mb-4">Tambah Lomba</h2>
      <div class="form-group">
        <label for="nama_kompetisi" class="text-white">Nama Kompetisi:</label>
        <input type="text" class="form-control" id="nama_kompetisi" v-model="form.nama_kompetisi" required>
      </div>
      <div class="form-group">
        <label for="deskripsi" class="text-white">Deskripsi:</label>
        <textarea class="form-control" id="deskripsi" v-model="form.deskripsi" required></textarea>
      </div>
      <div class="form-group">
        <label for="kategori" class="text-white">Kategori:</label>
        <select class="form-control" id="kategori" v-model="form.kategori" required>
          <option value="">Pilih Kategori</option>
          <option value="desain">Desain</option>
          <option value="programming">Programming</option>
          <option value="robotic">Robotic</option>
          <option value="CTF">CTF</option>
        </select>
      </div>
      <div class="form-group">
        <label for="biaya_pendaftaran" class="text-white">Biaya Pendaftaran:</label>
        <input type="number" class="form-control" id="biaya_pendaftaran" v-model="form.biaya_pendaftaran" required>
      </div>
      <div class="form-group">
        <label for="foto_poster" class="text-white">Foto Poster:</label>
        <input type="text" class="form-control" id="foto_poster" v-model="form.foto_poster" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Mengimpor useRouter dari Vue Router

const router = useRouter(); // Inisialisasi router

const form = ref({
  nama_kompetisi: '',
  deskripsi: '',
  kategori: '',
  biaya_pendaftaran: '',
  foto_poster:''
});

const submitForm = async () => {
  try {
    await axios.post('http://localhost:8000/api/kompetisi/tambah', form.value);
    router.push('/home');
    // Redirect to success page or do something else after successful submission
  } catch (error) {
    console.error('Failed to submit form:', error);
    // Handle error, display message to user, etc.
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.form-container {
  width: 500px;
  padding: 30px;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
}

.form-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 100%;
  resize: vertical; /* Allow resizing for textarea */
  color: #3d3d3d; /* Ubah warna teks menjadi abu-abu muda */
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
  background-color: #0069d9;
  border-color: #0069d9;
}
</style>