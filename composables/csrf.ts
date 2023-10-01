interface CsrfTokenResponse {
  token: string;
}

export const csrf = async (): Promise<string> => {
  try {
    const csrfToken: CsrfTokenResponse = await $fetch("/getcsrf", {
      method: "GET",
      baseURL: "http://localhost:8080",
      credentials: "include"
    });

    const tokenInfo = csrfToken.token;

    console.log("CSRF token stored in Cookies:", tokenInfo);

    return tokenInfo;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
};
