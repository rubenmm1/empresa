export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  // Token inválido o expirado
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = "/";
    return;
  }

  return response.json();
}
