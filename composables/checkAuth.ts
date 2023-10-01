
export const checkAuth = async (tokenType : string, csrfTokenPromise: Promise<string> | string) => {
  let token;
  const csrfToken = await csrfTokenPromise;

  if (tokenType === "accessToken") {
    token = localStorage.getItem("accessToken");
  } else if (tokenType === "refreshToken") {
    token = localStorage.getItem("refresh_token");
    localStorage.getItem("refresh_token");
  } else {
    console.error("Invalid tokenType:", tokenType);
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
      return false;
    }

    return { res };

  } catch (error) {
    console.error("Error checking authentication:", error);
  }
};
