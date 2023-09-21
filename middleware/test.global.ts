export default defineNuxtRouteMiddleware((to, from) => {
  console.log('test.global.ts : ');
  console.log(to);
  console.log(from);
});
