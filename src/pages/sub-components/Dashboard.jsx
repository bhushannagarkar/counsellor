import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { clearAllSkillErrors } from "@/store/slices/detailDiagnosisSlice";
import {
  clearAllSoftwareAppErrors,
  deleteSoftwareApplication,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllTimelineErrors } from "@/store/slices/timelineSlice";
import { clearAllappointmentsErrors } from "@/store/slices/appointmentSlice";
import './Dashboard.css'
import { getdoctor } from "@/store/slices/doctorSlice";

import forget from '../../../public/forgot.png';

const Dashboard = () => {
  const navigateTo = useNavigate();
  const gotoMangeSkills = () => {
    navigateTo("/manage/skills");
  };
  const gotoMangeTimeline = () => {
    navigateTo("/manage/timeline");
  };
  const gotoMangeappointments = () => {
    navigateTo("/manage/appointments");
  };

  const { doctor } = useSelector((state) => state.doctor);

  // console.log(doctor,"this is doctor data in dashboard")
  // const {
  //   skills,
  //   loading: skillLoading,
  //   error: skillError,
  //   message: skillMessage,
  // } = useSelector((state) => state.skill);
  // const {
  //   softwareApplications,
  //   loading: appLoading,
  //   error: appError,
  //   message: appMessage,
  // } = useSelector((state) => state.softwareApplications);
  // const {
  //   timeline,
  //   loading: timelineLoading,
  //   error: timelineError,
  //   message: timelineMessage,
  // } = useSelector((state) => state.timeline);
  const { appointments, error: appointmentsError } = useSelector(
    (state) => state.appointments
  );

  console.log(appointments, "this is appointment data dashbord");

  // useEffect(() => {
  //   dispatch(getdoctor());
  //   dispatch(getAllonlineTests());


  // }, []);


  const [appId, setAppId] = useState(null);
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    // if (skillError) {
    //   toast.error(skillError);
    //   dispatch(clearAllSkillErrors());
    // }
    // if (appError) {
    //   toast.error(appError);
    //   dispatch(clearAllSoftwareAppErrors());
    // }
    if (appointmentsError) {
      toast.error(appointmentsError);
      dispatch(clearAllappointmentsErrors());
    }
    // if (appMessage) {
    //   toast.success(appMessage);
    //   setAppId(null);
    //   dispatch(resetSoftwareApplicationSlice());
    //   dispatch(getAllSoftwareApplications());
    // }
    // if (timelineError) {
    //   toast.error(timelineError);
    //   dispatch(clearAllTimelineErrors());
    // }
  }, [
    dispatch,
    // skillLoading,
    // skillError,
    // skillMessage,
    // appLoading,
    // appError,
    // appMessage,
    // timelineError,
    // timelineLoading,
    // timelineMessage,
  ]);


  const formatAppointmentDate = (dateString) => {
    // console.log(dateString,"this is date ")
    const [day, month, year] = dateString.split('_');
    return new Date(year, month - 1, day).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };


  return (
    <>

      <div className="counsellor-dashboard-main">
        <main className="counsellor-dashboard-content">
          <h1 className="CounsellorHeading heading-of-counsellor">Counsellor Dashboard</h1>

          <div className="bhushan">

            <div className="adminProfile-container ">
              <div className="adminProfile-image">
                <img
                  src={doctor && doctor.doctorImage && doctor.doctorImage.url ? doctor.doctorImage.url : forget}
                  alt="Admin"
                  className="adminProfile-img"
                />

                <div className="adminProfile-image flex-item item3">
                  {/* <img
  src={doctor && doctor.doctorImage && doctor.doctorImage.url ? doctor.doctorImage.url : forget}
  alt="Admin"
  className="adminProfile-img"
/> */}

                  <h1 className="adminProfile-name">
                    {doctor ? doctor.doctorName : ""}
                  </h1>
                  <h1 className="adminProfile-name-only">
                    {doctor ? doctor.about : ""}
                  </h1>
                </div>




              </div>
              <div className="adminProfile-details">


              </div>


            </div>

            <div className="boxes">

              <div className="counsellor-dashboard-cards flex-container">


                <div className="counsellor-dashboard-card  visit-portfolio flex-item item1">
                  <div className="counsellor-dashboard-card-header">
                    <p className="counsellor-dashboard-description para">
                      {doctor.doctorName}
                    </p>
                  </div>
                  <div className="counsellor-dashboard-card-footer">
                    <button className="counsellor-dashboard-appointment-button">Visit Portfolio</button>
                  </div>
                </div>

                <div className="counsellor-dashboard-card all-appointments flex-item item1">
                  <div className="counsellor-dashboard-card-header">
                    <h3 className="counsellor-dashboard-header">All Appointments</h3>
                    <h1 className="counsellor-dashboard-header">{appointments && appointments.length}</h1>
                  </div>
                  <div className="counsellor-dashboard-card-footer">
                    {/* <button className="counsellor-dashboard-appointment-button" onClick={gotoManageAppointments}>
            Manage Appointments
          </button> */}
                  </div>
                </div>


              </div>

            </div>

          </div>
          <Tabs>
            <TabsContent>
              <div className="counsellor-dashboard-card latest-appointment-tab">
                <div className="counsellor-dashboard-card-header">
                  <h3 className="counsellor-dashboard-header latest-appointments-heading">Latest Appointments</h3>
                </div>
                <div className="counsellor-dashboard-card-content">
                  <table className="counsellor-dashboard-table ">
                    <thead className="table-heading">
                      <tr>
                        <th className="hidden md:table-cell">Sr.No.</th>
                        <th className="hidden md:table-cell">Appointment Number</th>
                        <th>Name</th>
                        <th className="hidden md:table-cell">Appointment Date</th>
                        <th className="hidden md:table-cell">Appointment Time</th>
                        <th className="hidden md:table-cell">Online/Offline</th>
                        <th>Update</th>
                        <th>recomended online test</th>
                        {/* <th className="text-right">Visit</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {appointments && appointments.length > 0 ? (
                        appointments.map((element, index) => (
                          <tr className="counsellor-dashboard-table-row" key={element.appointmentNumber}>
                            <td>{index + 1}</td>
                            <td>{element.appointmentNumber}</td>
                            <td>{element.patientName}</td>
                            <td className="hidden md:table-cell">{formatAppointmentDate(element.appointmentDate)}</td>
                            <td className="hidden md:table-cell">
                              {element.appointmentTime}
                            </td>

                            <td className="hidden md:table-cell">
                              {element.isOnlineOrOffline
                              }
                            </td>
                            <td>
                              <Link
                                to={`/update/appointment/${element._id}`}
                                className="counsellor-dashboard-detail-link"
                              >
                                <button className="counsellor-dashboard-appointment-button details-diagonisis-btn">Detail Diagnosis</button>
                              </Link>
                            </td>
                            <td className="text-right">
                              <Link
                                to={`/online/onlinetest/${element._id}`}
                                // target="_blank"
                                className="counsellor-dashboard-detail-link"
                              >
                                <button className="counsellor-dashboard-visit-button details-diagonisis-btn">Online test Details view</button>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="counsellor-dashboard-table-empty" colSpan="6">
                            You don't have any appointments.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

    </>
  );
};

export default Dashboard;
