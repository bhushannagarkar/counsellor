import "./UpdateAppointments.css";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getOnlineTestTransaction,
  clearOnlineErrors,
  clearAllOnlineTestMessages,
  resetOnlineTestTransactionSlice,
  updateCounsellorRemarks
} from "@/store/slices/onlineTestTransactionSlice";
import Logo from "../../public/logo.jpg";

const OnlineTestDetails = () => {
  const [selectedTests, setSelectedTests] = useState([]); // State for selected tests
  const [remarks, setRemarks] = useState({}); // State for consular remarks

  const { onlineTestsTransaction, loading, error, message } = useSelector(
    (state) => state.onlineTestTransaction
  );

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigateTo = useNavigate();

  // Fetch online test transaction details
  useEffect(() => {
    dispatch(getOnlineTestTransaction(id));
    return () => {
      dispatch(resetOnlineTestTransactionSlice());
    };
  }, [dispatch, id]);

  // Handle error messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearOnlineErrors());
    }
  }, [error, dispatch]);

  // Handle success messages
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearAllOnlineTestMessages());
    }
  }, [message, dispatch]);

  // Set selected tests when onlineTestsTransaction updates
  useEffect(() => {
    if (onlineTestsTransaction && onlineTestsTransaction.length > 0) {
      setSelectedTests(onlineTestsTransaction.map((test) => test.onlineTestId));
    }
  }, [onlineTestsTransaction]);

  // Update appointment handler
  const handleUpdateAppointment = async (e) => {
    e.preventDefault();
    console.log("Starting handleUpdateAppointment");
    console.log("Selected Tests:", selectedTests, "Remarks:", remarks);

    // Loop over selectedTests and dispatch an action for each
    for (const testId of selectedTests) {
      const consularRemark = remarks[testId] || ""; // Get remark or empty string if none
      console.log(`Updating Test ID: ${testId} with Remark: ${consularRemark}`);

      // Dispatch the updateCounsellorRemarks for each test
      await dispatch(updateCounsellorRemarks(testId, consularRemark));
    }

    console.log("Finished handleUpdateAppointment");
  };

  // const handleGenerateReport = async () => {
  //   const appointmentId = id; // Assuming you want to generate for the first test
  //   console.log(appointmentId,"this is appointment id ");
  //   if (!appointmentId) {
  //     toast.error("No appointment ID found.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('api/doctor/get-final-report', { appointmentId }, {
  //       responseType: 'blob', // Important for handling binary data
  //     });

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', `doctor_report_${appointmentId}.pdf`); // Set the file name
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //     toast.success("Report generated successfully!");
  //   } catch (error) {
  //     console.error("Error generating report:", error);
  //     toast.error("Failed to generate the report.");
  //   }
  // };

  // Handle remarks input change

  // const handleGenerateReport = async () => {
  //   const appointmentId = id; // Use the appointment ID from params or state
  //   console.log(appointmentId, "this is appointment ID");

  //   if (!appointmentId) {
  //     toast.error("No appointment ID found.");
  //     return;
  //   }

  //   try {
  //     // Request the report from the API
  //     const response = await axios.get('http://localhost:8000/api/doctor/get-final-report', { appointmentId });

  //     // Check if the response is successful
  //     if (response.data.success) {
  //       const reportPDFLink = response.data.reportPDFLink; // Get the Cloudinary URL from the response

  //       // Create a temporary download link
  //       const link = document.createElement('a');
  //       link.href = reportPDFLink; // Use the URL from Cloudinary
  //       link.download = `doctor_report_${appointmentId}.pdf`;
  //       document.body.appendChild(link);

  //       // Trigger the download and clean up
  //       link.click();
  //       link.remove();

  //       toast.success("Report generated successfully!");
  //     } else {
  //       toast.error("Failed to generate the report: " + response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error generating report:", error);
  //     toast.error("Failed to generate the report.");
  //   }
  // };


  const handleGenerateReport = async () => {
    const appointmentId = id; // Use the appointment ID from params or state
    console.log(appointmentId, "this is appointment ID bhushan");

    if (!appointmentId) {
      toast.error("No appointment ID found.");
      return;
    }

    try {
      // Request the report from the API using GET
      const response = await axios.get(`http://localhost:8000/api/doctor/get-final-report`, {
        params: { appointmentId }, // Send appointmentId as a query parameter
      });

      // Check if the response is successful
      if (response.data.success) {
        const reportPDFLink = response.data.reportPDFLink; // Get the Cloudinary URL from the response

        window.open(reportPDFLink, '_blank');
        toast.success("Report generated successfully!");
      } else {
        toast.error("Failed to generate the report: " + response.data.message);
      }
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate the report.");
    }
  };


  const handleRemarksChange = (testId, value) => {
    setRemarks((prevRemarks) => ({
      ...prevRemarks,
      [testId]: value,
    }));
  };


  // Navigate back to the dashboard
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  // Format appointment date
  const formatAppointmentDate = (dateString) => {
    const [day, month, year] = dateString.split("_");
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  return (
    <div className="diagnosysFormDiv">
      <div className="logoDiv">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="DiagnosisFormDiv">
        <form onSubmit={handleUpdateAppointment} className="DiagnosisForm">
          <div className="formBody">
            <div className="FormBodyDiv1">
              <div className="FormBodyDiv11">
                <h2 className="FormBodyDiv11-header">Online Details of Client</h2>
                <button
                  onClick={handleReturnToDashboard}
                  className="FormBodyDiv11-returnButton"
                >
                  Return to Dashboard
                </button>
              </div>
              <div className="FormBodyDiv12">
                <label className="FormBodyDiv12-div-label">
                  Client Recommended Online Tests Details
                </label>
                <div className="FormBodyDiv12-div">
                  {onlineTestsTransaction.map((test) => (
                    <div key={test.onlineTestId} className="testDetailsDiv mb-4">
                      <label className="testDetailsLabel">
                        <strong>Test Name:</strong> {test.onlineTestName}
                      </label>
                      <p><strong>Appointment No.:</strong> {test.appointmentDetails.appointmentNumber}</p>
                      <p><strong>Client Name:</strong> {test.appointmentDetails.patientName}</p>
                      <p><strong>Appointment Date:</strong> {formatAppointmentDate(test.appointmentDetails.appointmentDate)}</p>
                      <p><strong>Appointment Time:</strong> {test.appointmentDetails.appointmentTime}</p>
                      {/* <p><strong>Description:</strong> {test.onlineTestDescription}</p> */}
                      <p><strong>Total Score:</strong> {test.totalScore}</p>
                      <p><strong>Result Description:</strong> {test.resultDescription}</p>
                      <p><strong>Status:</strong> {test.status}</p>

                      {/* Consular Remarks Input */}
                      <div className="consularRemarksDiv">
                        <label htmlFor={`remarks-${test.onlineTestId}`} className="testDetailsLabel">
                          Counsellor Remarks:
                        </label>
                        <input
                          type="text"
                          id={`remarks-${test.onlineTestId}`}
                          className="consularRemarksInput"
                          value={remarks[test.onlineTestId] || ""}
                          onChange={(e) => handleRemarksChange(test.onlineTestId, e.target.value)}
                        />
                      </div>

                      <button
                        className="DiagnosisFormSubmitButton"
                        onClick={() => window.open(test.onlineTestQADetailesLink, "_blank")}
                      >
                        View PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="DiagnosisFormSubmitButtonDiv">
                <button
                  type="submit"
                  className="DiagnosisFormSubmitButton"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
              <div className="DiagnosisFormSubmitButtonDiv">
                <button
                  type="button"
                  className="DiagnosisFormSubmitButton"
                  onClick={handleGenerateReport}
                >
                  {/* Generate Report */}


                  {loading ? "Generating  Report..." : "Generate Report"}

                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnlineTestDetails;
