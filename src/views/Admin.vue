<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4" style="color:white">Admin Panel</h1>
    <div v-if="competitions.length" class="competition-list">
      <div v-for="competition in competitions" :key="competition.id" class="competition-item mb-4 p-4 bg-gray-100 rounded-lg">
        <h2 class="text-xl font-semibold" style="color:black">{{ competition.nama_kompetisi }}</h2>
        <br>
        <p >{{ competition.deskripsi }}</p>
        <br>
        <p ><strong>Biaya Pendaftaran:</strong> {{ competition.biaya_pendaftaran }}</p>
        <br>
        <button @click="editCompetition(competition.id)" class="btn btn-secondary mr-2">Edit</button>
        <button @click="deleteCompetition(competition.id)" class="btn btn-danger">Delete</button>
      </div>
    </div>
    <div v-else>
      <p style="color:white">No competitions available.</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const competitions = ref([]);

onMounted(async () => {
  checkRole();
  await fetchCompetitions();
});

const checkRole = () => {
  const role = localStorage.getItem('usertype');
  
  if (!role) {
    Swal.fire({
      icon: 'warning',
      title: 'Login Required',
      text: 'Please login first.',
      confirmButtonText: 'OK'
    }).then(() => {
      router.push('/'); // Redirect to login page
    });
  } else if (role === 'user') {
    router.push('/home'); // Redirect to home page for users
  } else if (role === 'admin') {
    // Admin is allowed to access this page, so no redirection needed
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Access Denied',
      text: 'You do not have permission to access this page.',
      confirmButtonText: 'OK'
    }).then(() => {
      router.push('/'); // Redirect to login page or another appropriate page
    });
  }
};

const fetchCompetitions = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/kompetisi');
    competitions.value = response.data;
  } catch (error) {
    console.error('Error fetching competitions:', error);
  }
};

const editCompetition = (id) => {
  router.push(`/edit/${id}`);
};

const deleteCompetition = async (id) => {
  if (confirm('Are you sure you want to delete this competition?')) {
    try {
      await axios.delete(`http://localhost:8000/api/kompetisi/hapus/${id}`);
      await fetchCompetitions(); // Refresh the list
      router.push({ path: `/admin` });
    } catch (error) {
      console.error('Error deleting competition:', error);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

.competition-list {
  margin-top: 20px;
}

.competition-item {
  border: 1px solid #ddd;
}

.btn {
  padding: 10px 15px;
  border-radius: 3px;
  cursor: pointer;
  color: white; /* Set the text color to white */
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>