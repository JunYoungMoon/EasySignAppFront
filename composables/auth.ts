export const auth = () => {

  const csrf = async () => {
    try {
      const response = await $fetch("/getcsrf",{
        method: "GET"});
      const tokenInfo = response.token;

      console.log("CSRF token stored in Cookies:", tokenInfo);

      return tokenInfo;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      throw error;
    }
  }



  return {
    csrf
  };
};

