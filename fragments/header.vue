<script setup>
import { csrf } from "~/composables/csrf";
import { checkAuth } from "~/composables/checkAuth";

onMounted(async () => {
  const { token } = await csrf();
  const isAuth = await checkAuth("accessToken", token);
});
</script>

<template>

</template>

<style scoped>

</style>
