import { csrf } from "~/composables/csrf";
import { checkAuth } from "~/composables/checkAuth";

interface AjaxRequestData {
  data?: object;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const fetchRequest = async (url: string, method: HttpMethod, data: AjaxRequestData) => {
  try {
    const { token } = await csrf();
    const isAuth = await checkAuth("accessToken", token);

    const res = await $fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    });

    return {
      res,
      isAuth
    };

  } catch (error: any) {
    console.log("Request error: " + error.message);
    throw error;
  }
};

