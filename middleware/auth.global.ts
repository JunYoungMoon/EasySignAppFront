import { csrf } from "~/composables/csrf";

export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const authResponse = await csrf();

    console.log(authResponse);
  } catch (error) {
    console.error("Error in middleware:", error);
  }
});
