import { auth } from "~/composables/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const csrf = auth();

  csrf.token() // 내부의 async 함수 실행
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.error("Error fetching CSRF token:", error);
    });
});
