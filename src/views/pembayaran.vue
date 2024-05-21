<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Show QR code section -->
    <div v-if="showQR" class="text-center">
      <img :src="qrCodeSrc" alt="QR Code" class="my-4" style="max-width: 200px;">
      <p>Please scan the QR code</p>
    </div>

    <!-- Form section -->
    <form v-else @submit.prevent="submitForm" class="form-container">
      <div class="form-group">
        <label for="name" class="text-gray-800">Name:</label>
        <input type="text" class="form-control" id="name" v-model="formData.name" required>
      </div>
      <div class="form-group">
        <label for="biaya" class="text-gray-800">Biaya Pendaftaran:</label>
        <input type="number" class="form-control" id="biaya" v-model="formData.biaya_pendaftaran" readonly required>
      </div>
      <!-- Hide the id_pendaftaran input field -->
      <input type="hidden" id="id_pendaftaran" v-model="formData.id_pendaftaran">
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const formData = ref({
  name: '',
  biaya_pendaftaran: '',
  id_pendaftaran: ''
});

const showQR = ref(false); // Initially hide QR code
let qrCodeSrc = ''; // QR code source

// Retrieve biaya_pendaftaran from local storage
const localStorageBiaya = localStorage.getItem('biaya') || '';

// On component mount, set the retrieved biaya_pendaftaran value
onMounted(() => {
  formData.biaya_pendaftaran = localStorageBiaya;
});

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/procces-payment', formData.value);
    console.log('Data terkirim:', response.data);
    // Generate QR code
    qrCodeSrc = response.data.qr_code_url;
    // Show QR code section
    showQR.value = true;
    // Automatically redirect after 20 seconds
    setTimeout(() => {
      window.location.href = '/home';
    }, 20000);
  } catch (error) {
    console.error('Gagal mengirim data:', error);
  }
};
</script>

<style scoped>
/* Your styles */
</style>