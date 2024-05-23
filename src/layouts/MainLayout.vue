<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>



        <q-toolbar-title>
         {{isAuthenticated ? user.email : 'Chat'}}
        </q-toolbar-title>

        <div>
          <q-btn v-if="isAuthenticated " color="negative" @click="salir" >Salir</q-btn>
<!--          <q-btn v-else color="positive" >Ingresar</q-btn>-->
        </div>
      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {auth, db, actualizar} from 'boot/firebase'
import {onAuthStateChanged, signOut } from 'firebase/auth';
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

const salir = async() => {
  try {
    // await updateDoc(doc(collection(db, 'usuarios'),user.value.uid), {
    //   estado: false,
    // });

    await actualizar('usuarios', user.value.uid, {estado:false});

  await signOut(auth);
  } catch (error){
    console.log(error)
  }
}



</script>
