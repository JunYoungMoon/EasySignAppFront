interface AjaxRequestData {
  token?: string;
  csrfToken?: string;
}

export const auth = () => {
  const token = async () => {
    try {
      const response = await $fetch("/getcsrf", {
        method: "GET",
        baseURL: "http://localhost:8080",
        credentials: "include"
      });

      console.log("CSRF token stored in Cookies:", response.token);

      return response.token;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      throw error;
    }
  };

  async function ajaxRequest<T>(
    url: string,
    method: string,
    data: AjaxRequestData | undefined = undefined
  ): Promise<T> {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json"
    };

    if (data.token) {
      headers.Authorization = `Bearer ${data.token}`;
    }

    if (data.csrfToken) {
      headers["X-XSRF-TOKEN"] = data.csrfToken;
    }

    try {
      return await $fetch(url, {
        method,
        headers,
        body: data
      });
    } catch (error) {
      throw new Error("Request error: " + error.message);
    }
  }

  return {
    token
  };
};

