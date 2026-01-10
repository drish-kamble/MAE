const API_URL = "http://localhost:5000/api/admin";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchAdminOrders = async () => {
  const res = await fetch(`${API_URL}/orders`, {
    headers: authHeader(),
  });
  return res.json();
};

export const fetchAdminQuotes = async () => {
  const res = await fetch(`${API_URL}/quotes`, {
    headers: authHeader(),
  });
  return res.json();
};
