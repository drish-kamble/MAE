import { useState } from "react";
import { loginUser, registerUser } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// 📱 Phone input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


// ✅ FIXED: OUTSIDE COMPONENT (IMPORTANT)
const FloatingInput = ({ type = "text", placeholder, value, onChange }) => (
  <div className="relative">
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="peer w-full border rounded px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <label className="absolute left-3 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
      {placeholder}
    </label>
  </div>
);


function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/";

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company: "",
    companyAddress: "",
    city: "",
    state: "",
    country: "",
  });

  const phoneRegex = /^\+[1-9]\d{7,14}$/;
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  // ✅ VALIDATION
  const validateForm = () => {
    if (!form.email || !form.email.includes("@")) return "Invalid email";

    if (isLogin && !form.password) return "Password required";

    if (!isLogin) {
      if (!form.name || form.name.length < 2) return "Enter full name";
      if (!phoneRegex.test(form.phone)) return "Invalid phone number";
      if (!form.company) return "Company required";
      if (!form.companyAddress) return "Company address required";
      if (!form.country) return "Country required";
      if (!strongPasswordRegex.test(form.password)) return "Weak password";
    }

    return null;
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const err = validateForm();
    if (err) return setError(err);

    setLoading(true);

    try {
      if (isLogin) {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });

        if (!res.success) {
          setError(res.message);
          setLoading(false);
          return;
        }

        login(res.user);
        navigate(redirectTo, { replace: true });

      } else {
        const res = await registerUser(form);

        if (!res.success) {
          setError(res.message);
          setLoading(false);
          return;
        }

        setIsLogin(true);
      }
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border">

        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <>
              <FloatingInput
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              {/* 📱 PHONE INPUT */}
              <div className="relative">
                <label className="absolute left-3 top-2 text-gray-500 text-xs">
                  Phone Number
                </label>

                <PhoneInput
                  country={"in"}
                  value={form.phone}
                  onChange={(value) =>
                    setForm({ ...form, phone: "+" + value })
                  }
                  enableSearch
                  containerClass="w-full"
                  inputClass="!w-full !h-[52px] !pl-14 !pt-5 !pb-2 !border !rounded !text-sm focus:!ring-2 focus:!ring-primary"
                  buttonClass="!border-none !bg-transparent"
                  dropdownClass="!text-sm"
                />
              </div>

              <FloatingInput
                placeholder="Company Name"
                value={form.company}
                onChange={(e) =>
                  setForm({ ...form, company: e.target.value })
                }
              />

              <FloatingInput
                placeholder="Company Address"
                value={form.companyAddress}
                onChange={(e) =>
                  setForm({ ...form, companyAddress: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <FloatingInput
                  placeholder="City"
                  value={form.city}
                  onChange={(e) =>
                    setForm({ ...form, city: e.target.value })
                  }
                />
                <FloatingInput
                  placeholder="State"
                  value={form.state}
                  onChange={(e) =>
                    setForm({ ...form, state: e.target.value })
                  }
                />
              </div>

              <FloatingInput
                placeholder="Country"
                value={form.country}
                onChange={(e) =>
                  setForm({ ...form, country: e.target.value })
                }
              />
            </>
          )}

          <FloatingInput
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded font-medium transition hover:bg-secondary disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          {isLogin ? "New here?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-primary font-medium hover:underline"
          >
            {isLogin ? "Create account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;