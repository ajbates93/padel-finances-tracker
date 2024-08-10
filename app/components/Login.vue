<template>
  <div>
    <UButton v-if="!isAuthenticated" v-on:click="login">Log In</UButton>
    <UButton v-else v-on:click="logout">Log Out</UButton>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";

const auth0 = import.meta.client ? useAuth0() : undefined;

const isAuthenticated = computed(() => {
  return auth0?.isAuthenticated.value;
});

const login = () => {
  auth0?.checkSession();
  if (!auth0?.isAuthenticated.value) {
    auth0?.loginWithRedirect({
      appState: {
        target: useRoute().path,
      },
    });
  }
};

const logout = () => {
  navigateTo("/");
  auth0?.logout();
};
</script>
