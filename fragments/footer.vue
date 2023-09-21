<template>
  <div>
    <VFooter :absolute="!fixed" app>
      <v-btn @click="toggleTheme">toggle theme</v-btn>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </VFooter>
  </div>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
const fixed = false;

function toggleTheme()
{
  theme.global.name.value = 'dark';
}

// const cookie = $cookies.get('theme');
//
// const test = onMounted(() => {
//   // 쿠키에서 테마 값을 읽기
//   theme.global.name.value = cookie;
//
//   // if (savedTheme === 'dark') {
//   //   theme.value = 'dark'; // 쿠키에 저장된 테마가 dark인 경우 dark 테마로 변경
//   // }
// });

</script>
