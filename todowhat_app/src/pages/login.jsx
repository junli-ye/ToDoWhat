import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 模拟发送请求
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        console.log("User Data:", data.user);
        console.log("Token:", data.token);
        // Redirect to the main application (or save token in localStorage)
        window.location.href = "/";
      } else {
        // 处理错误信息
        const errorDetails = data.error.details
          ? Object.values(data.error.details).join(", ")
          : data.error.message;
        setErrorMessage(errorDetails);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-sm" style={{ width: "24rem" }}>
            <div className="card-body">
            <h5 className="card-title text-center mb-4">Login</h5>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>

                <div className="d-flex justify-content-between mt-3">
                <Link href="/forgot-password" className="text-decoration-none">
                    Forgot Password?
                </Link>
                <Link href="/register" className="text-decoration-none">
                    Sign Up
                </Link>
                </div>
            </div>
        </div>
    </div>
  );
};


export default LoginPage;