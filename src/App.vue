<template>
  <div id="app">
    <!-- Conditional rendering untuk menampilkan Header -->
    <Header v-if="$route.meta.showHeader" />

    <!-- Content lainnya -->
    <router-view v-slot="{ Component, route }">
      <!-- Cek apakah route saat ini adalah halaman Login atau Register -->
      <div v-if="route.name === 'Login' || route.name === 'Register'">
        <!-- Tampilkan konten khusus untuk halaman Login dan Register -->
        <component :is="Component" />
      </div>
      <!-- Jika bukan halaman Login atau Register, tampilkan div container -->
      <div v-else class="container mx-auto px-6 py-7 lg:px-40 lg:py-14">
        <Header/>
        <transition
          :enter-active-class="route.meta.enterClass"
          :leave-active-class="route.meta.leaveClass"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </div>
    </router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header
  }
};
</script>