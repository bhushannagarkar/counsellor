import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAlldoctorErrors,  clearAlldoctorMessages,  login } from "@/store/slices/doctorSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import './Login.css'
import Navbar from "./Navbar";

const Login = () => {
  const [doctorEmailId, setdoctorEmailId] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.doctor
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = () => {
    dispatch(login(doctorEmailId, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAlldoctorErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    dispatch(clearAlldoctorMessages());
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    // <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
    //   <div className=" min-h-[100vh] flex items-center justify-center py-12">
    //     <div className="mx-auto grid w-[350px] gap-6">
    //       <div className="grid gap-2 text-center">
    //         <h1 className="text-3xl font-bold">Login</h1>
    //         <p className="text-balance text-muted-foreground">
    //           Enter your doctorEmailId below to login to your account
    //         </p>
    //       </div>
    //       <div className="grid gap-4">
    //         <div className="grid gap-2">
    //           <Label htmlFor="doctorEmailId">doctorEmailId</Label>
    //           <Input
    //             id="doctorEmailId"
    //             type="email"
    //             placeholder="m@example.com"
    //             value={doctorEmailId}
    //             onChange={(e) => setdoctorEmailId(e.target.value)}
    //             required
    //           />
    //         </div>
    //         <div className="grid gap-2">
    //           <div className="flex items-center">
    //             <Label>Password</Label>
    //             <Link
    //               to="/password/forgot"
    //               className="ml-auto inline-block text-sm underline"
    //             >
    //               Forgot your password?
    //             </Link>
    //           </div>
    //           <Input
    //             type="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </div>
    //         {loading ? (
    //           <SpecialLoadingButton content={"Loggin In"} />
    //         ) : (
    //           <Button
    //             onClick={() => handleLogin(doctorEmailId, password)}
    //             className="w-full"
    //           >
    //             Login
    //           </Button>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex justify-center items-center bg-muted">
    //     <img src="/login.png" alt="login" />
    //   </div>
    // </div>
    <>
 <Navbar/> 

  <div className="AdminDiv">
  <div className="adminAuth-container">
    <div className="adminLogin-form-container">
      <div className="grid gap-2 text-center">
        <h1 className="adminLogin-h1">Counsellor Login</h1>
        {/* <p className="text-balance text-muted-foreground">
          Enter your doctorEmailId below to login to your account
        </p> */}
      </div>
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
            onChange={(e) => setdoctorEmailId(e.target.value)}
            required
          />
        </div>
        <div className="adminLogin-input-group">
          <div className="flex items-center">
            <label className="adminLogin-label"> Counsellor Password</label>
            <Link
              to="/password/forgot"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
          </div>
          <input
            type="password"
            className="adminLogin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loading ? (
          <SpecialLoadingButton content={"Loggin In"} />
        ) : (
          <button
            onClick={() => handleLogin(doctorEmailId, password)}
            className="adminLogin-button"
          >
            Login
          </button>
        )}
      </div>
    </div>
  </div>
  {/* <div className="adminPageLogo">
    <img src="/login.png" alt="login" className="logo-image" />
  </div> */}
</div>
</>
  );
};

export default Login;
