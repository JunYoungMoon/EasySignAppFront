<script setup>
import { csrf } from "~/composables/csrf";
import { checkAuth } from "~/composables/checkAuth";

onMounted(async () => {
  const { token } = await csrf();
  const isAuth = await checkAuth("accessToken", token);

  console.log('isAuth : ',isAuth)
});
</script>

<template>

</template>

<style scoped>

</style>
