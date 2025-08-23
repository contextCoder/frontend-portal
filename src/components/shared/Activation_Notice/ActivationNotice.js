import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ActivationNotice.css";

function maskEmail(email) {
  if (!email) return "";
  const [name, domain] = email.split("@");
  const maskedName =
    name.length > 2
      ? name.slice(0, 2) + "*".repeat(name.length - 2)
      : name[0] + "*";
  return `${maskedName}@${domain}`;
}

export default function ActivationNotice() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [timer, setTimer] = useState(60); // 1 minute countdown
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    // TODO: Call backend API to resend activation link
    console.log("Resending activation link to:", email);
    setTimer(60);
    setCanResend(false);
  };

  return (
    <div className="activation-container">
      <div className="activation-card">
        <h2>Check your inbox 📩</h2>
        <p>
          We’ve sent an activation link to your email:{" "}
          <span className="highlight">{maskEmail(email)}</span>
        </p>
        <p className="small">
          Please click the link in the email to activate your account.
        </p>

        <button
          className={`resend-btn ${!canResend ? "disabled" : ""}`}
          onClick={handleResend}
          disabled={!canResend}
        >
          {canResend
            ? "Send activation link again"
            : `Send again in ${timer}s`}
        </button>

        <p className="login-text">
          Already activated?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Go to Login
          </span>
        </p>
      </div>
    </div>
  );
}
