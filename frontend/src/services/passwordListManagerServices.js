
export const addPassword = async (siteName, password) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/passwordList`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ siteName, password }),
  });
  const data = await response.json();
  return mapServerItemToLocalItem(data);
};

export const getAllPasswords = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/passwordList`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data.map(mapServerItemToLocalItem);
};

export const updatePassword = async (id, siteName, password) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/passwordList/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ siteName, password }),
  });
  const data = await response.json();
  return mapServerItemToLocalItem(data);
};

export const deletePassword = async (id) => {
  await fetch(`${import.meta.env.VITE_API_URL}/api/passwordList/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return id;
};

const mapServerItemToLocalItem = (item) => {
  return {
    id: item._id,
    siteName: item.siteName,
    password: item.password,
  };
};
