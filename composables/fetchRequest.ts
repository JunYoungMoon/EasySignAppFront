interface AjaxRequestData {
  token?: string;
  csrfToken?: string;
}

export const fetchRequest = () => {
  const response = async function ajaxRequest<T>(
    url: string,
    method: string,
    data: AjaxRequestData | undefined = undefined
  ): Promise<T> {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json"
    };

    //로컬 스토리지의 토큰을 찾아야함
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

  return response()
    .then(res => {
      return res;
    })
    .catch(error => {
      console.error("Error fetching CSRF token:", error);
    });
};

