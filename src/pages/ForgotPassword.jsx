import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAlldoctorErrors } from "@/store/slices/doctorSlice";
import {
  forgotPassword,
  verifyForgotPasswordCode,
} from "@/store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const ForgotPassword = () => {
  const [doctorEmailId, setdoctorEmailId] = useState("");
  const [providedCode, setProvidedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false); // To track if the code has been sent
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // Handle forgot password request
  const handleForgotPassword = (doctorEmailId) => {
    dispatch(forgotPassword(doctorEmailId)).then(() => {
      if (!error) {
        setCodeSent(true); // Only proceed to code verification if no error occurred
      }
    });
  };

  // Handle verification of the code and resetting the password
  const handleVerifyCode = (doctorEmailId, providedCode, newPassword) => {
    dispatch(verifyForgotPasswordCode(doctorEmailId, providedCode, newPassword)).then(() => {
      if (!error) {
        // Navigate to login page after successful reset
        toast.success("Password reset successfully! Please log in.");
        navigateTo("/login"); // Redirect to login after success
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
    if (message !== null) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message, navigateTo]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              {codeSent ? "Verify Code" : "Forgot Password"}
            </h1>
            <p className="text-balance text-muted-foreground">
              {codeSent
                ? "Enter the code sent to your doctorEmailId and reset your password"
                : "Enter your doctorEmailId to request a password reset code"}
            </p>
          </div>
          <div className="grid gap-4">
            {/* Show doctorEmailId input if code is not yet sent */}
            {!codeSent ? (
              <div className="grid gap-2">
                <Label htmlFor="doctorEmailId">doctorEmailId</Label>
                <Input
                  id="doctorEmailId"
                  type="email"
                  placeholder="m@example.com"
                  value={doctorEmailId}
                  onChange={(e) => setdoctorEmailId(e.target.value)}
                  required
                />
              </div>
            ) : (
              <>
                {/* Input for the verification code */}
                <div className="grid gap-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter your code"
                    value={providedCode}
                    onChange={(e) => setProvidedCode(e.target.value)}
                    required
                  />
                </div>

                {/* Input for the new password */}
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div className="grid gap-2">
              <div className="flex items-center">
                <Link
                  to="/login"
                  className="ml-auto inline-block text-sm underline"
                >
                  {codeSent ? "Go back to login" : "Remember your password?"}
                </Link>
              </div>
            </div>

            {/* Show the button to request code or verify code */}
            {!loading ? (
              codeSent ? (
                <Button
                  onClick={() =>
                    handleVerifyCode(doctorEmailId, providedCode, newPassword)
                  }
                  className="w-full"
                >
                  Reset Password
                </Button>
              ) : (
                <Button
                  onClick={() => handleForgotPassword(doctorEmailId)}
                  className="w-full"
                >
                  Request Reset Code
                </Button>
              )
            ) : (
              <SpecialLoadingButton
                content={codeSent ? "Verifying" : "Requesting"}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img src="/forgot.png" alt="login" />
      </div>
    </div>
  );
};

export default ForgotPassword;
