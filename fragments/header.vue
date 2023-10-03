<script setup>
import { csrf } from "~/composables/csrf";
import { checkAuth } from "~/composables/checkAuth";

onMounted(async () => {
  const isAuth = checkAuth("accessToken", csrf());

  debugger;
  console.log(isAuth);
});
</script>

<template>

</template>

<style scoped>

</style>
