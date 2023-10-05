
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
    await $fetch("/check-auth", {
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
    }).then(async (response) => {
      if (tokenType === "accessToken" && response === "Refresh token required") {
        await checkAuth("refreshToken", csrfToken);
        return false;
      }
      return { response };
    })
    .catch((err) => {
      console.log(err.message);
    });
  } catch (error) {
    console.log("Error checking authentication:", error);
    return false;
  }
};
