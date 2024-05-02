<template>
  <div class="container mx-auto px-4 py-8">
    <form @submit.prevent="submitForm" class="form-container">
      <div class="form-group">
        <label for="full-name" class="text-gray-800">Full Name:</label>
        <input type="text" class="form-control" id="full-name" v-model="personalInfo.nama" required>
      </div>
      <div class="form-group">
        <label for="email" class="text-gray-800">E-mail:</label>
        <input type="email" class="form-control" id="email" v-model="personalInfo.email" required>
      </div>
      <div class="form-group">
        <label for="phone" class="text-gray-800">Phone Number:</label>
        <input type="tel" class="form-control" id="phone" v-model="personalInfo.phone_number" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router'; // Mengimpor useRouter dari Vue Router

const router = useRouter(); // Inisialisasi router

const props = defineProps({
  id: String,
});

const personalInfo = ref({
  id_kompetisi: props.id,
  nama: '',
  email: '',
  phone_number: ''
});

const submitForm = async () => {
  try {
    await axios.post('http://localhost:8000/api/daftar/tambah', personalInfo.value);
    console.log('Data terkirim!');
    router.push('/home');
  } catch (error) {
    console.error('Gagal mengirim data:', error);
    console.log(personalInfo.value)
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