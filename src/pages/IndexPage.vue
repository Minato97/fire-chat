<template>
  <q-page padding>
  <VistaAcceso v-if="!isAuthenticated"></VistaAcceso>
  </q-page>
</template>

<script setup>
import VistaAcceso from "components/VistaAcceso.vue";

import {onMounted, ref} from "vue";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "boot/firebase";

const isAuthenticated = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      isAuthenticated.value = true;
    } else {
      isAuthenticated.value = false;
    }
  });
});
</script>
