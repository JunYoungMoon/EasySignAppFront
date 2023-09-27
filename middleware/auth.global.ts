import { csrf } from "~/composables/csrf";
import { checkAuth } from "~/composables/checkAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const csrfToken = await csrf();
    const authResponse = await checkAuth('accessToken', csrfToken);

    console.log(authResponse);
  } catch (error) {
    console.error("Error in middleware:", error);
  }
});
