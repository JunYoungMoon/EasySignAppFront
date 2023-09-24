export const csrf = () => {
  const response = async () => {
    const csrf = await $fetch("/getcsrf", {
      method: "GET",
        baseURL: "http://localhost:8080",
        credentials: "include"
    });

    const tokenInfo = csrf.token;

    console.log("CSRF token stored in Cookies:", tokenInfo);

    return tokenInfo;
  };

  return response()
    .then(res => {
      return res;
    })
    .catch(error => {
      console.error("Error fetching CSRF token:", error);
    });
};
