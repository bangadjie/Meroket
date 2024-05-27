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
    <div v-if="showQR" class="qr-code">
        <img :src="qrCodeSrc" alt="QR Code">
        <p style="color:white">Bayar Sebelum Halaman Di alihkan (1 menit)</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, defineProps, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 

const router = useRouter(); 

const props = defineProps({
  id: String,
});

const personalInfo = ref({
  id_kompetisi: props.id,
  nama: '',
  email: '',
  phone_number: ''
});

const formData = ref({
  name: '',
  biaya_pendaftaran: '',
  id_pendaftaran: ''
});

const showQR = ref(false); 
let qrCodeSrc = ''; 

onMounted(() => {
  formData.biaya_pendaftaran = localStorageBiaya;
});

const submitForm = async () => {
  try {
    await axios.post('http://localhost:8000/api/tambahdaftar', personalInfo.value);
    
    const storedIds = JSON.parse(localStorage.getItem('id_kompetisi') || '[]');
    storedIds.push(props.id);
    localStorage.setItem('id_kompetisi', JSON.stringify(storedIds));
    
    console.log('Data terkirim!');

    const paymentResponse = await axios.post('http://localhost:8000/api/procces-payment', {
      name: personalInfo.value.nama,
      id_pendaftaran: personalInfo.value.id_kompetisi,
      biaya_pendaftaran: localStorageBiaya
    });
    console.log('Payment processed:', paymentResponse.data);

    qrCodeSrc = paymentResponse.data.qr;
    showQR.value = true;

    setTimeout(() => {
      window.location.href = '/home';
    }, 60000);

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

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 10px;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}
</style>