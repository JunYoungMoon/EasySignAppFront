import { csrf } from "~/composables/csrf";
import { checkAuth } from "~/composables/checkAuth";

interface AjaxRequestData {
  data?: object;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const fetchRequest = async (url: string, method: HttpMethod, data: AjaxRequestData | undefined = undefined) => {
  try {
    const isAuth = checkAuth("accessToken", await csrf());

    await $fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    }).then(res => {
      return res;
    }).catch(error => {
      console.error("Error fetching CSRF token:", error);
    });

  } catch (error: any) {
    throw new Error("Request error: " + error.message);
  }
};

