export const checkAuth = async (tokenType: string, csrfToken: string) => {
  let token;

  if (tokenType === "accessToken" || localStorage.getItem("accessToken")) {
    token = localStorage.getItem("accessToken");
  } else if (tokenType === "refreshToken" || localStorage.getItem("refreshToken")) {
    token = localStorage.getItem("refreshToken");
  } else {
    return false;
  }

  try {
    const res = await $fetch("/check-auth", {
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

    if (tokenType === "accessToken" && res === "Refresh token required") {
      await checkAuth("refreshToken", csrfToken);
    }

    console.log("check-auth :", res);

    return res;
  } catch (error) {
    console.log("Error checking authentication:", error);
    return false;
  }
};
