
export const signUp = async (userName, email, password, confirmPassword) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, email, password, confirmPassword }),
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

export const signIn = async (email, password) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};
