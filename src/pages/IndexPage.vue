<template>
  <q-page class="text-center">
    <h1 class="text-h3">Welcome to Quasar</h1>
    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 flex align-center items-center justify-center">
      <q-card class="card">
        <q-card-section>
          <q-avatar icon="person" text-color="white" color="primary" />
        </q-card-section>
        <q-card-section>
          <q-card-title>{{ UserName }}</q-card-title>
        </q-card-section>
        <q-card-section>
          <q-btn label="Logout" color="primary" @click="logout" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useLoginStore } from 'src/stores/login';
import { useRouter } from 'vue-router';

const loginStore = useLoginStore();
const router = useRouter();

const UserName = ref(loginStore.username);

const logout = () => {
  loginStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 300px; /* Limit the maximum width */
  height: 100%; /* Ensure the card fills its container */
  display: flex;
  flex-direction: column;
}
</style>
