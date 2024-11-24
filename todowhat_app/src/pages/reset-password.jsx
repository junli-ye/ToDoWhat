import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ResetPasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Password validation
  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength && hasLetter && hasNumber && hasSpecialChar
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Local validations
    if (oldPassword === newPassword) {
      setErrorMessage("New password cannot be the same as the old password.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters long and include letters, numbers, and special characters."
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    try {
      const response = await fetch("/api/users/changePwd", {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_TEST_TOKEN", // Replace with real token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Password changed successfully!");
        setErrorMessage("");
        setShowModal(true);
      } else {
        setErrorMessage(result.error.message || "An unexpected error occurred.");
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
          <h5 className="card-title text-center mb-4">Reset Password</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="oldPassword" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResetPasswordPage;