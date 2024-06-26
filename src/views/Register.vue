<template>
  <div class="login">
    <img src="assets/img/login-bg.png" alt="login image" class="login__img">

    <form @submit.prevent="register" class="login__form">
      <h1 class="login__title">Register</h1>

      <div class="login__content">
        <div class="login__box">
          <i class="ri-user-3-line login__icon"></i>
          <div class="login__box-input">
            <input v-model.trim="form.name" type="text" required class="login__input" id="login-user" placeholder=" ">
            <label for="login-email" class="login__label">Username</label>
          </div>
        </div>

        <div class="login__box">
          <i class="ri-user-3-line login__icon"></i>
          <div class="login__box-input">
            <input v-model.trim="form.email" type="email" required class="login__input" id="login-email" placeholder=" ">
            <label for="login-email" class="login__label">Email</label>
          </div>
        </div>

        <div class="login__box">
          <i class="ri-lock-2-line login__icon"></i>
          <div class="login__box-input">
            <input v-model.trim="form.password" type="password" required class="login__input" id="login-pass" placeholder=" ">
            <label for="login-pass" class="login__label">Password</label>
            <i class="ri-eye-off-line login__eye" id="login-eye"></i>
          </div>
        </div>
      </div>

      <div class="login__check">
        <div class="login__check-group">
          <input type="checkbox" class="login__check-input" id="login-check">
          <label for="login-check" class="login__check-label">Remember me</label>
        </div>

        <a href="#" class="login__forgot">Forgot Password?</a>
      </div>

      <button type="submit" class="login__button">Register</button>

      <p class="login__register">
        Already have an account? <router-link to="/" href="#"><a>Sign In</a></router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  setup() {
    const router = useRouter();
    const form = ref({
      name: '',
      email: '',
      password: ''
    });

    const register = async () => {
      console.log(form.value);
      
      try {
        const response = await axios.post('http://localhost:8000/api/register', {
          name: form.value.name,
          email: form.value.email,
          password: form.value.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        router.push('/');
      } catch (error) {
        showErrorMessage('Registration failed. Please try again later.');
      }
    };

    const showErrorMessage = (message) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      });
    };

    return {
      form,
      register
    };
  }
};
</script>

<style setup>
/*=============== GOOGLE FONTS ===============*/
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap");
/*=============== VARIABLES CSS ===============*/
:root {
  /*========== Colors ==========*/
  /*Color mode HSL(hue, saturation, lightness)*/
  --white-color: hsl(0, 0%, 100%);
  --black-color: hsl(0, 0%, 0%);
  /*========== Font and typography ==========*/
  /*.5rem = 8px | 1rem = 16px ...*/
  --body-font: "Poppins", sans-serif;
  --h1-font-size: 1.75rem;
  --normal-font-size: 1rem;
  --small-font-size: .813rem;
  /*========== Font weight ==========*/
  --font-medium: 500;
}

/*=============== BASE ===============*/
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body,
input,
button {
  font-size: var(--normal-font-size);
  font-family: var(--body-font);
}

body {
  color: var(--white-color);
}

input,
button {
  border: none;
  outline: none;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
}

/*=============== LOGIN ===============*/
.login {
  position: relative;
  height: 100vh;
  display: grid;
  align-items: center;
}
.login__img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.login__form {
  position: relative;
  background-color: hsla(0, 0%, 10%, 0.1);
  border: 2px solid var(--white-color);
  margin-inline: 1.5rem;
  padding: 2.5rem 1.5rem;
  border-radius: 1rem;
  backdrop-filter: blur(8px);
}
.login__title {
  text-align: center;
  font-size: var(--h1-font-size);
  font-weight: var(--font-medium);
  margin-bottom: 2rem;
}
.login__content, .login__box {
  display: grid;
}
.login__content {
  row-gap: 1.75rem;
  margin-bottom: 1.5rem;
}
.login__box {
  grid-template-columns: max-content 1fr;
  align-items: center;
  column-gap: 0.75rem;
  border-bottom: 2px solid var(--white-color);
}
.login__icon, .login__eye {
  font-size: 1.25rem;
}
.login__input {
  width: 100%;
  padding-block: 0.8rem;
  background: none;
  color: var(--white-color);
  position: relative;
  z-index: 1;
}
.login__box-input {
  position: relative;
}
.login__label {
  position: absolute;
  left: 0;
  top: 13px;
  font-weight: var(--font-medium);
  transition: top 0.3s, font-size 0.3s;
}
.login__eye {
  position: absolute;
  right: 0;
  top: 18px;
  z-index: 10;
  cursor: pointer;
}
.login__box:nth-child(2) input {
  padding-right: 1.8rem;
}
.login__check, .login__check-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login__check {
  margin-bottom: 1.5rem;
}
.login__check-label, .login__forgot, .login__register {
  font-size: var(--small-font-size);
}
.login__check-group {
  column-gap: 0.5rem;
}
.login__check-input {
  width: 16px;
  height: 16px;
}
.login__forgot {
  color: var(--white-color);
}
.login__forgot:hover {
  text-decoration: underline;
}
.login__button {
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: transparent; /* Change background to transparent */
  border: 2px solid var(--white-color); /* Set border to white */
  color: var(--white-color); /* Set text color to white */
  font-weight: var(--font-medium);
  cursor: pointer;
  margin-bottom: 2rem;
}

.login__register {
  text-align: center;
}
.login__register a {
  color: var(--white-color);
  font-weight: var(--font-medium);
}
.login__register a:hover {
  text-decoration: underline;
}

/* Input focus move up label */
.login__input:focus + .login__label {
  top: -12px;
  font-size: var(--small-font-size);
}

/* Input focus sticky top label */
.login__input:not(:placeholder-shown).login__input:not(:focus) + .login__label {
  top: -12px;
  font-size: var(--small-font-size);
}

/*=============== BREAKPOINTS ===============*/
/* For medium devices */
@media screen and (min-width: 576px) {
  .login {
    justify-content: center;
  }
  .login__form {
    width: 432px;
    padding: 4rem 3rem 3.5rem;
    border-radius: 1.5rem;
  }
  .login__title {
    font-size: 2rem;
  }
}
</style>