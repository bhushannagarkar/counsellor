import { Link, useNavigate } from "react-router-dom";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Dashboard from "./sub-components/Dashboard";
// import AddSkill from "./sub-components/AddSkill";
// import AddProject from "./sub-components/AddProject";
// import AddSoftwareApplications from "./sub-components/AddSoftwareApplications";
import Account from "./sub-components/Account";
import { useDispatch, useSelector } from "react-redux";
import { clearAlldoctorErrors, logout } from "@/store/slices/doctorSlice";
import { toast } from "react-toastify";
import { getAllappointments } from "@/store/slices/appointmentSlice";
// import Messages from "./sub-components/Messages";
// import AddTimeline from "./sub-components/AddTimeline";
import './Homepage.css'
import logo from '../../public/logo.jpg'
const HomePage = () => {
  const [active, setActive] = useState("");
  const { isAuthenticated, error, doctor } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };
  const navigateTo = useNavigate();

  useEffect(() => {
    // Handle errors with toast notifications
    if (error) {
      toast.error(error);
      dispatch(clearAlldoctorErrors());
    }

    // Navigate to login if not authenticated
    if (!isAuthenticated) {
      navigateTo("/login");
    }

    // Ensure doctor._id is available before dispatching the getAllappointments action
    if (doctor && doctor._id) {
      console.log(doctor._id, "this is doctor id in home page");
      dispatch(getAllappointments(doctor._id));
    }

  }, [isAuthenticated, doctor?._id, error, dispatch, navigateTo]);
  return (
    // <div className="flex min-h-screen w-full flex-col bg-muted/40">
    //   <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
    //     <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
    //       <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
    //         <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
    //         <span className="sr-only">Acme Inc</span>
    //       </Link>
    //       <TooltipProvider>
    //         <Tooltip>
    //           <TooltipTrigger asChild>
    //             <Link
    //               className={`flex h-9 w-9 items-center justify-center rounded-lg ${
    //                 active === "Dashboard"
    //                   ? "text-accent-foreground bg-accent"
    //                   : "text-muted-foreground"
    //               }  transition-colors hover:text-foreground md:h-8 md:w-8`}
    //               onClick={() => setActive("Dashboard")}
    //             >
    //               <Home className="h-5 w-5" />
    //               <span className="sr-only">Dashboard</span>
    //             </Link>
    //           </TooltipTrigger>
    //           <TooltipContent side="right">Dashboard</TooltipContent>
    //         </Tooltip>
    //       </TooltipProvider>

    //       <TooltipProvider>
    //         <Tooltip>
    //           <TooltipTrigger asChild>
    //             <Link
    //               className={`flex h-9 w-9 items-center justify-center rounded-lg ${
    //                 active === "Messages"
    //                   ? "text-accent-foreground bg-accent"
    //                   : "text-muted-foreground"
    //               }  transition-colors hover:text-foreground md:h-8 md:w-8`}
    //               onClick={() => setActive("Messages")}
    //             >
    //               <MessageSquareMore className="h-5 w-5" />
    //               <span className="sr-only">Messages</span>
    //             </Link>
    //           </TooltipTrigger>
    //           <TooltipContent side="right">Messages</TooltipContent>
    //         </Tooltip>
    //       </TooltipProvider>
    //       <TooltipProvider>
    //         <Tooltip>
    //           <TooltipTrigger asChild>
    //             <Link
    //               className={`flex h-9 w-9 items-center justify-center rounded-lg ${
    //                 active === "Account"
    //                   ? "text-accent-foreground bg-accent"
    //                   : "text-muted-foreground"
    //               }  transition-colors hover:text-foreground md:h-8 md:w-8`}
    //               onClick={() => setActive("Account")}
    //             >
    //               <User className="h-5 w-5" />
    //               <span className="sr-only">Account</span>
    //             </Link>
    //           </TooltipTrigger>
    //           <TooltipContent side="right">Account</TooltipContent>
    //         </Tooltip>
    //       </TooltipProvider>
    //     </nav>
    //     <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
    //       <TooltipProvider>
    //         <Tooltip>
    //           <TooltipTrigger asChild>
    //             <Link
    //               className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
    //               onClick={handleLogout}
    //             >
    //               <LogOut className="h-5 w-5" />
    //               <span className="sr-only">Logout</span>
    //             </Link>
    //           </TooltipTrigger>
    //           <TooltipContent side="right">Logout</TooltipContent>
    //         </Tooltip>
    //       </TooltipProvider>
    //     </nav>
    //   </aside>
    //   <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
    //     <Sheet>
    //       <SheetTrigger asChild>
    //         <Button size="icon" variant="outline" className="sm:hidden">
    //           <PanelLeft className="h-5 w-5" />
    //           <span className="sr-only">Toggle Menu</span>
    //         </Button>
    //       </SheetTrigger>
    //       <SheetContent side="left" className="sm:max-w-xs">
    //         <nav className="grid gap-6 text-lg font-medium">
    //           <Link
    //             className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base`}
    //           >
    //             <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
    //             <span className="sr-only">Acme Inc</span>
    //           </Link>
    //           <Link
    //             href="#"
    //             className={`flex items-center gap-4 px-2.5 ${
    //               active === "Dashboard"
    //                 ? "text-foreground"
    //                 : "text-muted-foreground hover:text-foreground "
    //             }`}
    //             onClick={() => setActive("Dashboard")}
    //           >
    //             <Home className="h-5 w-5" />
    //             Dashboard
    //           </Link>
            
    //           <Link
    //             className={`flex items-center gap-4 px-2.5 ${
    //               active === "Profile"
    //                 ? "text-foreground"
    //                 : "text-muted-foreground hover:text-foreground "
    //             }`}
    //             onClick={() => setActive("Account")}
    //           >
    //             <User className="h-5 w-5" />
    //             Account
    //           </Link>
         
    //           <Link
    //             className={`flex items-center gap-4 px-2.5 ${
    //               active === "Messages"
    //                 ? "text-foreground"
    //                 : "text-muted-foreground hover:text-foreground "
    //             }`}
    //             onClick={() => setActive("Messages")}
    //           >
    //             <MessageSquareMore className="h-5 w-5" />
    //             Messages
    //           </Link>
    //           <Link
    //             className={
    //               "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    //             }
    //             onClick={handleLogout}
    //           >
    //             <LogOut className="h-5 w-5" />
    //             Logout
    //           </Link>
    //         </nav>
    //       </SheetContent>
    //     </Sheet>

    //     <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
    //       <img
    //         src={doctor && doctor.doctorImage && doctor.doctorImage.url}
    //         alt="avatar"
    //         className="w-20 h-20 rounded-full max-[900px]:hidden"
    //       />
    //       <h1 className="text-4xl max-[900px]:text-2xl">
    //         Welcome back, {doctor.doctorName}
    //       </h1>
    //     </div>
    //   </header>
    //   {(() => {
    //     switch (active) {
    //       case "Dashboard":
    //         return <Dashboard />;
    //         break;
    //       case "Messages":
    //         return <Messages />;
    //         break;
    //       case "Account":
    //         return <Account />;
    //         break;
    //       default:
    //         return <Dashboard />;
    //         break;
    //     }
    //   })()}
    // </div>



// <div className="slideBar-div">
//   <aside className="fixed bhushan inset-y-0 left-0 hidden w-[200px] flex-col border-r bg-background sm:flex z-50">
//   {/* <aside className="asidebar fixed "> */}
//     <nav className="slideBar-list">
//       <div className="logoDiv">
//         <Link className="Website-Logo">
//           {/* <img src="path_to_logo_image" alt="Acme Inc" /> */}
//         </Link>
//       </div>
//       <ul>
//         <li>
//           <Link
//             className={`slideBar-link ${active === "Dashboard" ? "active-link" : ""}`}
//             onClick={() => setActive("Dashboard")}
//           >
//             {/* <img src="path_to_home_icon" alt="Dashboard" /> */}
//             <span>Dashboard</span>
//           </Link>
//         </li>
//         <li>
//           <Link
//             className={`slideBar-link ${active === "Messages" ? "active-link" : ""}`}
//             onClick={() => setActive("Messages")}
//           >
//             {/* <img src="path_to_message_icon" alt="Messages" /> */}
//             <span>Messages</span>
//           </Link>
//         </li>
//         <li>
//           <Link
//             className={`slideBar-link ${active === "Account" ? "active-link" : ""}`}
//             onClick={() => setActive("Account")}
//           >
//             {/* <img src="path_to_account_icon" alt="Account" /> */}
//             <span>Account</span>
//           </Link>
//         </li>
//       </ul>
//     </nav>
//     <nav className="mt-auto slideBar-list">
//       <Link
//         className="slideBar-link"
//         onClick={handleLogout}
//       >
//         {/* <img src="path_to_logout_icon" alt="Logout" /> */}
//         <span>Logout</span>
//       </Link>
//     </nav>
//   </aside>
//   {/* <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//     <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5 uploadDoctor">
//       <img
//         src={doctor?.doctorImage?.url}
//         alt="Doctor Avatar"
//         className="w-20 h-20 rounded-full uploadDoctorInput"
//       />
//       <h1 className="text-4xl">Welcome back, {doctor.doctorName}</h1>
//     </div>
//   </header> */}
//   {(() => {
//     switch (active) {
//       case "Dashboard":
//         return <Dashboard />;
//       case "Messages":
//         return <Messages />;
//       case "Account":
//         return <Account />;
//       default:
//         return <Dashboard />;
//     }
//   })()}
// </div>


<div className="slideBar-div">
  <aside className="fixed bhushan inset-y-0 left-0 w-[200px] flex-col border-r bg-background sm:flex z-50">

    {/* <h1>Bhushan nagarkar</h1> */}

    <img src={logo} alt="counsellor"  className="image-logo"/>
    <nav className="slideBar-list">
      <div className="logoDiv">
        <Link className="Website-Logo">
          {/* <img src="path_to_logo_image" alt="Acme Inc" /> */}
        </Link>
      </div>
      <ul>
        <li>
          <Link
            className={`slideBar-link ${active === "Dashboard" ? "active-link" : ""}`}
            onClick={() => setActive("Dashboard")}
          >
            <span>Dashboard</span>
          </Link>
        </li>
        {/* <li>
          <Link
            className={`slideBar-link ${active === "Messages" ? "active-link" : ""}`}
            onClick={() => setActive("Messages")}
          >
            <span>Messages</span>
          </Link>
        </li> */}
        <li>
          <Link
            className={`slideBar-link ${active === "Account" ? "active-link" : ""}`}
            onClick={() => setActive("Account")}
          >
            <span>Account</span>
          </Link>
        </li>
      </ul>
    </nav>
    <nav className="mt-auto slideBar-list">
      <Link className="slideBar-link btnLogout" onClick={handleLogout}>
        <span>Logout</span>
      </Link>
    </nav>
  </aside>

  {/* Dynamic Content based on active page */}
  <div className="content-area">
  {(() => {
    switch (active) {
      case "Dashboard":
        return <Dashboard />;
      case "Messages":
        return <Messages />;
      case "Account":
        return <Account />;
      default:
        return <Dashboard />;
    }
  })()}
</div>
</div>
  );
};

export default HomePage;
