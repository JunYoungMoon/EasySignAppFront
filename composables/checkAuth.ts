interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  refreshTokenRequired : boolean;
  // Add other properties as needed
}

export const checkAuth = async (tokenType: string, csrfToken: string) => {
  let token;

  if (tokenType === "accessToken" && localStorage.getItem("accessToken")) {
    token = localStorage.getItem("accessToken");
  } else if (tokenType === "refreshToken" && localStorage.getItem("refreshToken")) {
    token = localStorage.getItem("refreshToken");
  } else {
    return false;
  }

  try {
    const res: AuthResponse = await $fetch("/check-auth", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken
      },
      method: "POST",
      baseURL: "http://localhost:8080",
      credentials: "include",
      data: {
        token,
        csrfToken
      }
    });

    if (tokenType === "accessToken" && res.refreshTokenRequired) {
      await checkAuth("refreshToken", csrfToken);
      return false;
    }

    if(tokenType === "refreshToken" && res.accessToken && res.refreshToken){
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      await checkAuth("accessToken", csrfToken);
      return false;
    }

    console.log("check-auth :", res);

    return res;
  } catch (error) {
    console.log("Error checking authentication:", error);
    return false;
  }
};
