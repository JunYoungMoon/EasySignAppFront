<script setup>
import { csrf } from "~/composables/csrf";
import { checkAuth } from "~/composables/checkAuth";

onMounted(async () => {
  const csrfToken = await csrf();
  const authResponse = await checkAuth('accessToken', csrfToken);


});
</script>

<template>

</template>

<style scoped>

</style>
