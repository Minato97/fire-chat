<template>
  <div class="q-px-xl">
    <h5>Formulario de {{acceder ? 'Login' : 'Registro'}}</h5>
    <q-form class="q-gutter-md" @submit.prevent="procesarFormulario">
      <q-input label="Email" v-model="email"></q-input>
      <q-input label="Password" v-model="password"></q-input>
      <q-btn :label="acceder ? 'Login' : 'Registro'" type="submit" color="primary"></q-btn>
      <q-btn color="primary" outline v-if="!acceder" @click="acceder = true">
        ¿Ya tienes cuenta?
      </q-btn>
      <q-btn color="negative" outline v-else @click="acceder = false">
        ¿No tienes cuenta?
      </q-btn>
    </q-form>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {actualizar, crear, auth, db} from 'boot/firebase'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';



const email = ref('prueba@gmail.com')
const password = ref('123456')
const acceder = ref(true)
const isAuthenticated = ref(false);
const user = ref(null);

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser;
      isAuthenticated.value = true;
    } else {
      user.value = null;
      isAuthenticated.value = false;
    }
  });
});

const procesarFormulario = async () => {

  if (!email.value.trim() || !password.value.trim()) {
    console.log("campos vacíos");
    return;
  }

  try {
    if (!acceder.value) {
      // Registrar
      const usuario = await createUserWithEmailAndPassword(auth, email.value, password.value);
      console.log(usuario.user);

      await crear(
        'usuarios',
        usuario.user.uid,
        {email: usuario.user.email, estado: true,uid: usuario.user.uid})
    } else {
      // Login
      const usuario = await signInWithEmailAndPassword(auth, email.value, password.value);
      console.log(usuario.user);
      await actualizar('usuarios', usuario.user.uid, {estado:true});

    }
    email.value=""
    password.value=""
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>

</style>
