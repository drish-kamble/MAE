import { useState } from "react";
import { loginUser, registerUser } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/";
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company: "",
    city: "",
    state: "",
  });

  // 🌍 International phone (E.164)
  const phoneRegex = /^\+[1-9]\d{7,14}$/;

  // 🔐 Strong password regex
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // ---------- VALIDATION ----------
  const validateForm = () => {
    if (!form.email || !form.email.includes("@")) {
      return "Invalid email address";
    }

    // Password validation ONLY during registration
    if (!isLogin && !strongPasswordRegex.test(form.password)) {
      return "Password must be 8+ chars, include uppercase, lowercase, number & special character";
    }

    if (isLogin && !form.password) {
      return "Password is required";
    }

    if (!isLogin) {
      if (!form.name || form.name.trim().length < 2) {
        return "Full name is required";
      }

      if (!form.phone || !phoneRegex.test(form.phone)) {
        return "Phone must include country code (e.g. +14155552671)";
      }
    }

    return null;
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (isLogin) {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });

        if (!res.success) {
          setError(res.message);
          return;
        }

        login(res.user, res.token);
        console.log("LOGGED IN USER:", res.user);
        navigate(redirectTo, { replace: true });
      } else {
        const res = await registerUser(form);

        if (!res.success) {
          setError(res.message);
          return;
        }

        alert("Registered successfully. Please login.");
        setIsLogin(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 border p-6 rounded">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        {!isLogin && (
          <>
            <input
              placeholder="Full Name"
              className="w-full border p-2"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Phone (e.g. +14155552671)"
              className="w-full border p-2"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              placeholder="Company Name (optional)"
              className="w-full border p-2"
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            />

            <input
              placeholder="City (optional)"
              className="w-full border p-2"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />

            <input
              placeholder="State (optional)"
              className="w-full border p-2"
              value={form.state}
              onChange={(e) =>
                setForm({ ...form, state: e.target.value })
              }
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border p-2"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        {!isLogin && (
          <p className="text-xs text-gray-600">
            Password must be at least 8 characters and include uppercase,
            lowercase, number, and special character.
          </p>
        )}

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button className="w-full bg-purple-700 text-white py-2 rounded">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        {isLogin ? (
          <button onClick={() => setIsLogin(false)}>
            Create an account
          </button>
        ) : (
          <button onClick={() => setIsLogin(true)}>
            Already have an account?
          </button>
        )}
      </p>
    </div>
  );
}

export default Auth;
