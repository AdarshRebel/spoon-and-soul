// src/admin/api.js
// All API calls to the backend server

const BASE = process.env.REACT_APP_API_URL || 'https://spoon-and-soul-production.up.railway.app';


const getToken = () => localStorage.getItem('admin_token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// ── AUTH ──
export const login = async (username, password) => {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
};

export const getMe = async () => {
  const res = await fetch(`${BASE}/api/auth/me`, { headers: headers() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const res = await fetch(`${BASE}/api/auth/change-password`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

// ── RECIPES (ADMIN) ──
export const getAdminRecipes = async () => {
  const res = await fetch(`${BASE}/api/admin/recipes`, { headers: headers() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const createRecipe = async (recipe) => {
  const res = await fetch(`${BASE}/api/admin/recipes`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(recipe),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const updateRecipe = async (id, recipe) => {
  const res = await fetch(`${BASE}/api/admin/recipes/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(recipe),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const deleteRecipe = async (id) => {
  const res = await fetch(`${BASE}/api/admin/recipes/${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const togglePublish = async (id) => {
  const res = await fetch(`${BASE}/api/admin/recipes/${id}/publish`, {
    method: 'PATCH',
    headers: headers(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const getStats = async () => {
  const res = await fetch(`${BASE}/api/admin/stats`, { headers: headers() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};
