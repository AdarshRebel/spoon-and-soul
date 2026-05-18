const BASE = process.env.REACT_APP_API_URL;

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
});

// ── AUTH ──
export const login = async (username, password) => {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data;
};

export const getMe = async () => {
  const res = await fetch(`${BASE}/api/auth/me`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Auth failed");

  return data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const res = await fetch(`${BASE}/api/auth/change-password`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Password change failed");

  return data;
};
