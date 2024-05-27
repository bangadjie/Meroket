import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
  {
    path: "/Home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
  {
    path: "/detail/:id",
    name: "Details",
    component: () => import("../views/Details.vue"),
    props: true,
    meta: {
      enterClass: "animate__animated animate__fadeInRight",
      leaveClass: "animate__animated animate__fadeOutRight",
    },
  },
  {
    path: "/tambah",
    name: "tambah",
    component: () => import("../views/tambah.vue"),
    props: true,
    meta: {
      enterClass: "animate__animated animate__fadeInRight",
      leaveClass: "animate__animated animate__fadeOutRight",
    },
  },
  {
    path: "/daftar/:id",
    name: "daftar",
    component: () => import("../views/Daftar_Kompetisi.vue"),
    props: true,
    meta: {
      enterClass: "animate__animated animate__fadeInRight",
      leaveClass: "animate__animated animate__fadeOutRight",
    },
  },
  {
    path: "/pembayaran",
    name: "pembayaran",
    component: () => import("../views/pembayaran.vue"),
    props: true,
    meta: {
      enterClass: "animate__animated animate__fadeInRight",
      leaveClass: "animate__animated animate__fadeOutRight",
    },
  },
  {
    path: "/history",
    name: "history",
    component: () => import("../views/History.vue"),
    props: true,
    meta: {
      enterClass: "animate__animated animate__fadeInRight",
      leaveClass: "animate__animated animate__fadeOutRight",
    },
  },
  {
    path: "/favorit",
    name: "favorit",
    component: () => import("../views/Favorite.vue"),
    props: true,
    meta: {
      enterClass: "animate__animated animate__fadeInRight",
      leaveClass: "animate__animated animate__fadeOutRight",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
