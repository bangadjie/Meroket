<script setup>
import HeartIcon from "./icons/HeartIcon.vue";
</script>

<template>
  <div class="flex justify-between items-center">
    <router-link to="/home">
      <h1 class="text-lg font-semibold tracking-wider text-gray-200 md:text-xl">
        MEROKET
      </h1>
    </router-link>

    <div class="flex-1 flex justify-center">
      <div class="flex space-x-4 md:space-x-6">
        <router-link to="/home" class="text-gray-200 text-sm tracking-wide md:text-lg">
          Find Competition
        </router-link>

        <router-link to="/teams" class="text-gray-200 text-sm tracking-wide md:text-lg">
          Teams
        </router-link>

        <router-link to="/favorit" class="text-gray-200 text-sm tracking-wide md:text-lg">
          Favorite
        </router-link>

        <router-link to="/history" class="text-gray-200 text-sm tracking-wide md:text-lg">
          History
        </router-link>
      </div>
    </div>

    <router-link to="/tambah" class="flex text-red-600 items-center cursor-pointer">
      <HeartIcon />
      <span class="text-sm tracking-wide md:text-lg">Tambah Lomba</span>
    </router-link>
  </div>

  <p
    class="
      mt-6
      mb-7
      text-gray-200 text-xs
      font-light
      tracking-wide
      md:text-sm md:tracking-wider
      lg:text-xs
    "
  >
    Temukan Lombamu!
  </p>
</template>