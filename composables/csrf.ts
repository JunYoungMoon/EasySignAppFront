export const csrf = async () => {
  try {
    const csrfToken = await $fetch("/getcsrf", {
      method: "GET",
      baseURL: "http://localhost:8080",
      credentials: "include"
    });

    const tokenInfo = csrfToken.token;

    console.log("CSRF token stored in Cookies:", tokenInfo);

    return tokenInfo;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};
