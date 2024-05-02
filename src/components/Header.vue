<script setup>
import HeartIcon from "./icons/HeartIcon.vue";
</script>
<template>
  <div class="flex justify-between items-center">
    <router-link to="/home">
      <h1
        class="text-xl font-semibold tracking-wider text-gray-200 md:text-2xl"
      >
        MEROKET
      </h1>
    </router-link>

    <router-link
      to="/tambah"
      class="flex text-red-600 items-center cursor-pointer"
    >
      <HeartIcon />

      <span class="text-lg tracking-wide md:text-xl">Tambah Lomba</span>
    </router-link>
    

  </div>
  <p
    class="
      mt-6
      mb-7
      text-gray-200 text-xs
      font-light
      tracking-wide
      md:text-lg md:tracking-wider
      lg:text-sm
    "
  >
    Temukan Lombamu!
  </p>
</template>