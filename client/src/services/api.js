const API_BASE = "http://localhost:5000/api";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
};

/* ---------------- PRODUCTS ---------------- */

export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`);
  return res.json();
};

/* ---------------- AUTH ---------------- */

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
};

/* ---------------- ORDERS ---------------- */

export const createOrder = async (orderData) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });

  return res.json();
};

/* ---------------- USER ORDERS ---------------- */

export const fetchMyOrders = async () => {
  const res = await fetch(`${API_BASE}/orders/my`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const fetchOrderById = async (id) => {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

