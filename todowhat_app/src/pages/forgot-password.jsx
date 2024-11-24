import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ForgotPasswordPage = () => {
  const [captchaValue, setCaptchaValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleCaptcha = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    try {
      const response = await fetch("/api/users/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: document.getElementById("email").value }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("The email has been sent. Please check your inbox. If your email is not in our database, you will not receive an email.");
        setErrorMessage("");
        setShowModal(true);
        startCooldown(120);
      } else {
        setErrorMessage(result.error.message || "An unexpected error occurred.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  const startCooldown = (seconds) => {
    setIsCooldown(true);
    setCountdown(seconds);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // 倒计时结束时清除计时器
          setIsCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: "24rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Forgot Password?</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Enter your email</label>
              <input type="email" className="form-control" id="email" required />
              <small className="form-text text-muted">
                  If you have registered before, a temporary password will be sent to your email. Please use it to log in and change your password immediately.
              </small>
            </div>
            <ReCAPTCHA
              sitekey="6LcmpIgqAAAAALbILtUTYT_hsq8fBTeaWv-7cAQ2"
              onChange={handleCaptcha}
            />
            <div className="d-grid mt-3">
              <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isCooldown} // 如果在倒计时状态则禁用按钮
                >
                  {isCooldown ? `Resend in ${countdown}s` : "Send"}
                </button>
            </div>
          </form>
        </div>
      </div>

      {/* 弹窗提示 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ForgotPasswordPage;