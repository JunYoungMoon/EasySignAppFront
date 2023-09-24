import { csrf } from "~/composables/csrf";

export default defineNuxtRouteMiddleware((to, from) => {
  const authResponse = csrf();
});
