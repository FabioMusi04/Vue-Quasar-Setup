<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
          <q-page class="flex flex-center bg-grey-2">
            <q-card class="q-pa-md shadow-2 my_card" bordered>
              <q-card-section class="text-center">
                <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
                <div class="text-grey-8">Sign in below to access your account</div>
              </q-card-section>
              <q-card-section>
                <q-input dense outlined v-model="username" label="username"></q-input>
                <q-input dense outlined class="q-mt-md" v-model="password" type="password" label="Password"></q-input>
              </q-card-section>
              <q-card-section>
                <q-btn style="
      border-radius: 8px;" color="dark" rounded size="md" label="Sign in" no-caps class="full-width" @click="login"></q-btn>
              </q-card-section>
              <q-card-section class="text-center q-pt-none">
                <div class="text-grey-8">Don't have an account yet?
                  <a href="#" class="text-dark text-weight-bold" style="text-decoration: none">Sign
                    up.</a></div>
              </q-card-section>
    
            </q-card>
          </q-page>
        </q-page-container>
      </q-layout>
    
  </template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from 'src/stores/login';

const router = useRouter();
const loginStore = useLoginStore();

const username = ref('');
const password = ref('');

const login = () => {
  console.log('Logging in...');
  if (username.value === 'admin' && password.value === 'password') {
    loginStore.login(username.value, password.value);
    router.push('/');
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
