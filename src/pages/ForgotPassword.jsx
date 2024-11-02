import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAlldoctorErrors } from "@/store/slices/doctorSlice";
import {
  forgotPassword,
  verifyForgotPasswordCode,
} from "@/store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import Navbar from "./Navbar";
import "./ForgotPassword.css"; // Reusing the CSS classes

const ForgotPassword = () => {
  const [doctorEmailId, setDoctorEmailId] = useState("");
  const [providedCode, setProvidedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false); // Tracks if the code has been sent
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = () => {
    dispatch(forgotPassword(doctorEmailId)).then(() => {
      if (!error) {
        setCodeSent(true);
        toast.success("Verification code sent to your email!");
      }
    });
  };

  const handleVerifyCode = () => {
    dispatch(
      verifyForgotPasswordCode(doctorEmailId, providedCode, newPassword)
    ).then(() => {
      if (!error) {
        toast.success("Password reset successfully! Please log in.");
        navigateTo("/login");
      }
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAlldoctorErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message, navigateTo]);

  return (
    <>
      <Navbar />

      <div className="AdminDiv">
        <div className="adminAuth-container">
          <div className="adminLogin-form-container">
            <div className="grid gap-2 text-center">
              <h1 className="adminLogin-h1">Forgot Password</h1>
            </div>
            {!codeSent ? (
              <div className="grid gap-4">
                <div className="adminLogin-input-group">
                  <label className="adminLogin-label" htmlFor="doctorEmailId">
                    Counsellor Email
                  </label>
                  <input
                    id="doctorEmailId"
                    type="email"
                    className="adminLogin-input"
                    placeholder="m@example.com"
                    value={doctorEmailId}
                    onChange={(e) => setDoctorEmailId(e.target.value)}
                    required
                  />
                </div>
                {loading ? (
                  <SpecialLoadingButton content={"Sending Code..."} />
                ) : (
                  <button
                    onClick={handleForgotPassword}
                    className="adminLogin-button"
                  >
                    Send Verification Code
                  </button>
                )}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Link
                      to="/login"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Remember your password?
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="adminLogin-input-group">
                  <label className="adminLogin-label" htmlFor="verificationCode">
                    Verification Code
                  </label>
                  <input
                    id="verificationCode"
                    type="text"
                    className="adminLogin-input"
                    placeholder="Enter code"
                    value={providedCode}
                    onChange={(e) => setProvidedCode(e.target.value)}
                    required
                  />
                </div>
                <div className="adminLogin-input-group">
                  <label className="adminLogin-label" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className="adminLogin-input"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                {loading ? (
                  <SpecialLoadingButton content={"Resetting Password..."} />
                ) : (
                  <button
                    onClick={handleVerifyCode}
                    className="adminLogin-button"
                  >
                    Reset Password
                  </button>
                )}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Link
                      to="/login"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Go back to login
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
