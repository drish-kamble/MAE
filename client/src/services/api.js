const API_BASE = "http://localhost:5000/api";

/* ---------------- DEFAULT OPTIONS ---------------- */
const defaultOptions = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

/* ---------------- PRODUCTS ---------------- */

export const fetchProducts = async ({
  search = "",
  type = "ALL",
  page = 1,
}) => {
  const res = await fetch(
    `${API_BASE}/products?search=${search}&type=${type}&page=${page}`
  );

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
    ...defaultOptions,
    body: JSON.stringify(data),
  });

  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data),
  });

  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    ...defaultOptions,
  });

  return res.json();
};

/* ---------------- ORDERS ---------------- */

export const createOrder = async (orderData) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(orderData),
  });

  return res.json();
};

/* ---------------- USER ORDERS ---------------- */

export const fetchMyOrders = async () => {
  const res = await fetch(`${API_BASE}/orders/my`, {
    ...defaultOptions,
  });
  return res.json();
};

export const fetchOrderById = async (id) => {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    ...defaultOptions,
  });
  return res.json();
};

export const fetchProductTypes = async () => {
  const res = await fetch(`${API_BASE}/products/types`);
  return res.json();
};