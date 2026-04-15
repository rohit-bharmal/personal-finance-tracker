const BASE_URL = "http://127.0.0.1:8000";

export const signup = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getExpenses = async (token) => {
  const res = await fetch(`${BASE_URL}/expenses/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const addExpense = async (data, token) => {
  const res = await fetch(`${BASE_URL}/expenses/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteExpense = async (id, token) => {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
