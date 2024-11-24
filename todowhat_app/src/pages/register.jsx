import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCaptcha = (value) => {
    setCaptchaValue(value);
  };

  // 动态验证密码是否符合要求
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long and include letters, numbers, and special symbols.");
    } else {
      setPasswordError("");
    }
    setPassword(password);
  };

  // 验证两次输入的密码是否一致
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
    setConfirmPassword(confirmPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // 确保验证码和密码验证通过
    if (!captchaValue) {
      setErrorMessage("Please complete the CAPTCHA.");
      return;
    }
    if (passwordError || confirmPasswordError) {
      setErrorMessage("Please fix the password issues before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, captcha: captchaValue }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(
            <>
                User registered successfully!{" "}
                <a href="/login" className="text-decoration-none">Click here to login</a>
            </>
        );
        setErrorMessage("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        const errorDetails = data.error.details
          ? Object.values(data.error.details).join(", ")
          : data.error.message;
        setErrorMessage(errorDetails);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: "24rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Register</h5>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
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
                onChange={(e) => validatePassword(e.target.value)}
                required
              />
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => validateConfirmPassword(e.target.value)}
                required
              />
              {confirmPasswordError && <div className="text-danger">{confirmPasswordError}</div>}
            </div>
            <div className="mb-3">
              <ReCAPTCHA
                sitekey="6LcmpIgqAAAAALbILtUTYT_hsq8fBTeaWv-7cAQ2"
                onChange={handleCaptcha}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;