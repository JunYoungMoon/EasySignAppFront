export const csrf = async () => {
  try {
    return await $fetch("/getcsrf", {
      method: "GET",
      baseURL: "http://localhost:8080",
      credentials: "include"
    });

  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
};
