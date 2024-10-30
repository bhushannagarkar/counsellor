import "./UpdateAppointments.css"
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import {
  clearAllappointmentsErrors,
  getAllappointments,
} from "@/store/slices/appointmentSlice";
import { Button } from "@/components/ui/button";
import { clearAllOnlineTestErrors, getAllonlineTests } from "@/store/slices/onlineTestSlice";
import { Input } from "@/components/ui/input";
import { addNewDetailDiagnosis, resetAllDiagnosisMessageSlice, resetdetailDiagnosisSlice } from "@/store/slices/detailDiagnosisSlice";
import { clearAlldoctorMessages } from "@/store/slices/doctorSlice";
import Logo from "../../public/logo.jpg"

const UpdateAppoinment = () => {
  const [appointmentId, setAppointmentId] = useState();
  const [appointmentNo, setAppointmentNo] = useState();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientProblemDesc, setPatientProblemDesc] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [education, setEducation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [residence, setResidence] = useState("");
  const [family, setFamily] = useState("");
  const [membersInFamily, setMembersInFamily] = useState("");
  const [identificationMarks, setIdentificationMarks] = useState(["", ""]);
  const [reliability, setReliability] = useState("");
  const [previousConsultation, setPreviousConsultation] = useState("");
  const [consultationDetails, setConsultationDetails] = useState("");

  // Personal History
  const [birthDevelopment, setBirthDevelopment] = useState("");
  const [childhoodDisorders, setChildhoodDisorders] = useState("");
  const [homeAtmosphere, setHomeAtmosphere] = useState("");
  const [scholasticActivities, setScholasticActivities] = useState("");
  const [vocationHistory, setVocationHistory] = useState("");
  const [menstrualHistory, setMenstrualHistory] = useState("");

  const [sexualMaritalHistory, setSexualMaritalHistory] = useState("");
  const [forensicHistory, setForensicHistory] = useState("");
  const [generalPatternLiving, setGeneralPatternLiving] = useState("");
  const [premorbidPersonality, setPremorbidPersonality] = useState("");
  const [relations, setRelations] = useState("");
  const [workLeisure, setWorkLeisure] = useState("");
  const [mood, setMood] = useState("");
  const [character, setCharacter] = useState("");
  const [attitudesStandards, setAttitudesStandards] = useState("");
  const [habits, setHabits] = useState("");
  const [generalAppearance, setGeneralAppearance] = useState("");
  const [attitude, setAttitude] = useState("");
  const [motorBehavior, setMotorBehavior] = useState("");
  const [speech, setSpeech] = useState("");
  const [cognitiveFunctions, setCognitiveFunctions] = useState("");
  const [moodAffect, setMoodAffect] = useState("");
  const [thought, setThought] = useState("");
  const [perceptualDisorders, setPerceptualDisorders] = useState("");
  const [judgment, setJudgment] = useState("");
  const [insight, setInsight] = useState("");
  const [diagnosticFormulation, setDiagnosticFormulation] = useState("");

  //selected states 
  const [selectedTests, setSelectedTests] = useState([]); // State to track selected tests

  // const { error, message, loading } = useSelector((state) => state.appointments);
  const { onlineTests, error: onlineTestsError, message: onlineTestMessage } = useSelector(
    (state) => state.onlineTests
  );

  const { loading, error, message, } = useSelector(
    (state) => state.diagnosis
  );


  console.log("all online tests bhushan", onlineTests)
  const dispatch = useDispatch();
  const { id } = useParams();
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
  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`http://localhost:8000/api/doctor/appointment/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setAppointmentId(id);
          setAppointmentNo(res.data.appointment.appointmentNumber)
          setName(res.data.appointment.patientName);
          setDate(formatAppointmentDate(res.data.appointment.appointmentDate));
          setTime(res.data.appointment.appointmentTime);
          setPatientProblemDesc(res.data.appointment.patientProblemDesc);
          setAddress(res.data.appointment.patientAddress);
          setContactNo(res.data.appointment.patientMobileNo);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();

    if (error) {
      toast.error(error);
      // dispatch(clearAllappointmentsErrors());
    }
    if (onlineTestsError) {
      toast.error(onlineTestsError);
      dispatch(clearAllOnlineTestErrors());
    }
    if (message) {
      toast.success(message);
      // dispatch(resetdetailDiagnosisSlice());
    }
    // if (onlineTestMessage) {
    //   toast.success(onlineTestMessage);
    // // getAllonlineTests();
    //   // dispatch(getAllonlineTests());
    // //   dispatch(getAllappointments());
    // }
    dispatch(resetAllDiagnosisMessageSlice());
    dispatch(clearAlldoctorMessages());
  }, [id, message, error]);


  const handleUpdateAppoinment = (e) => {
    e.preventDefault();
    const formData = {
      appointmentId,
      patientProblemDesc,
      age,
      sex,
      education,
      occupation,
      maritalStatus,
      residence,
      family,
      membersInFamily,
      identificationMarks,
      reliability,
      previousConsultation,
      consultationDetails,
      birthDevelopment,
      childhoodDisorders,
      homeAtmosphere,
      scholasticActivities,
      vocationHistory,
      menstrualHistory,
      sexualMaritalHistory, // Added field
      forensicHistory,      // Added field
      generalPatternLiving, // Added field
      premorbidPersonality,  // Added field
      relations,            // Added field
      workLeisure,          // Added field
      mood,                 // Added field
      character,            // Added field
      attitudesStandards,   // Added field
      habits,               // Added field
      generalAppearance,     // Added field
      attitude,             // Added field
      motorBehavior,        // Added field
      speech,               // Added field
      cognitiveFunctions,   // Added field
      moodAffect,          // Added field
      thought,             // Added field
      perceptualDisorders,  // Added field
      judgment,            // Added field
      insight,             // Added field
      diagnosticFormulation, // Added field
      selectedTests, // Include selected tests in the form data
    };
    dispatch(addNewDetailDiagnosis(formData));
  };

  // Handle checkbox change
  const handleCheckboxChange = (testId) => {
    setSelectedTests((prevSelectedTests) =>
      prevSelectedTests.includes(testId)
        ? prevSelectedTests.filter((id) => id !== testId)
        : [...prevSelectedTests, testId]
    );
  };
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };


 
  return (
    // <>
    //   <div className="diagnosysFormDiv">
    //     <div className="logoDiv">
    //       <img src={Logo} alt="" />
    //     </div>

    //     <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
    //     <form onSubmit={handleUpdateAppoinment} className="w-[100%] px-5 md:w-[1000px] pb-5">
    //       <div className="space-y-12">
    //         <div className="border-b border-gray-900/10 pb-12">
    //           <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
    //             <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
    //               CASE RECORD FORM
    //             </h2>
    //             <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
    //               APPOINTMENT NO.{appointmentNo}
    //             </h2>
    //             <Button onClick={handleReturnToDashboard}>Return to Dashboard</Button>
    //           </div>
    //           <div className="mt-10 flex flex-col gap-5">

    //             {/* Patient Details */}
    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
    //               <input
    //                 disabled
    //                 type="text"
    //                 className="block w-full mt-2 border rounded-md shadow-sm focus:ring-indigo-600"
    //                 value={name}
    //                 onChange={(e) => setName(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Date</label>
    //               <input
    //                 disabled
    //                 type="text"
    //                 className="block w-full mt-2 border rounded-md shadow-sm focus:ring-indigo-600"
    //                 value={date}
    //                 onChange={(e) => setDate(e.target.value)}
    //               />
    //             </div>


    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Time</label>
    //               <input
    //                 disabled
    //                 type="text"
    //                 className="block w-full mt-2 border rounded-md shadow-sm focus:ring-indigo-600"
    //                 value={time}
    //                 onChange={(e) => setTime(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Patient Problem Desc</label>
    //               <input
    //                 type="text"
    //                 className="block w-full mt-2 border rounded-md shadow-sm focus:ring-indigo-600"
    //                 value={patientProblemDesc}
    //                 onChange={(e) => setPatientProblemDesc(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Age</label>
    //               <input
    //                 type="number"
    //                 className="block w-full mt-2 border rounded-md shadow-sm focus:ring-indigo-600"
    //                 value={age}
    //                 onChange={(e) => setAge(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Sex</label>
    //               <Select value={sex} onValueChange={setSex}>
    //                 <SelectTrigger>
    //                   <SelectValue placeholder="Select Gender" />
    //                 </SelectTrigger>
    //                 <SelectContent>
    //                   <SelectItem value="Male">Male</SelectItem>
    //                   <SelectItem value="Female">Female</SelectItem>
    //                   <SelectItem value="Transgender">Transgender</SelectItem>
    //                   <SelectItem value="Gay">Gay</SelectItem>
    //                   <SelectItem value="Lesbian">Lesbian</SelectItem>
    //                 </SelectContent>
    //               </Select>
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Address</label>
    //               <Textarea
    //                 disabled
    //                 placeholder="Enter address"
    //                 value={address}
    //                 onChange={(e) => setAddress(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Contact No.</label>
    //               <input
    //                 disabled
    //                 type="text"
    //                 className="block w-full mt-2 border rounded-md shadow-sm focus:ring-indigo-600"
    //                 value={contactNo}
    //                 onChange={(e) => setContactNo(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Education</label>
    //               <input
    //                 type="text"
    //                 className="block w-full mt-2 border rounded-md shadow-sm focus:ring-indigo-600"
    //                 value={education}
    //                 onChange={(e) => setEducation(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Occupation</label>
    //               <input
    //                 type="text"
    //                 className="block w-full mt-2 border rounded-md shadow-sm focus:ring-indigo-600"
    //                 value={occupation}
    //                 onChange={(e) => setOccupation(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Marital Status</label>
    //               <Select value={maritalStatus} onValueChange={setMaritalStatus}>
    //                 <SelectTrigger>
    //                   <SelectValue placeholder="Select Marital Status" />
    //                 </SelectTrigger>
    //                 <SelectContent>
    //                   <SelectItem value="Single">Single</SelectItem>
    //                   <SelectItem value="Married">Married</SelectItem>
    //                   <SelectItem value="Separated">Separated</SelectItem>
    //                   <SelectItem value="Divorced">Divorced</SelectItem>
    //                   <SelectItem value="Widower">Widower</SelectItem>
    //                   <SelectItem value="Remarried">Remarried</SelectItem>
    //                 </SelectContent>
    //               </Select>
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Residence</label>
    //               <Select value={residence} onValueChange={setResidence}>
    //                 <SelectTrigger>
    //                   <SelectValue placeholder="Select Residence Type" />
    //                 </SelectTrigger>
    //                 <SelectContent>
    //                   <SelectItem value="Rented">Rented</SelectItem>
    //                   <SelectItem value="Owned">Owned</SelectItem>
    //                   <SelectItem value="Family">Family</SelectItem>
    //                 </SelectContent>
    //               </Select>
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Family</label>
    //               <Textarea
    //                 placeholder="Details about family"
    //                 value={family}
    //                 onChange={(e) => setFamily(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Members in Family</label>
    //               <input
    //                 type="number"
    //                 className="block w-full mt-2 border rounded-md shadow-sm focus:ring-indigo-600"
    //                 value={membersInFamily}
    //                 onChange={(e) => setMembersInFamily(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Identification Marks</label>
    //               <div className="flex gap-2">
    //                 {identificationMarks.map((mark, index) => (
    //                   <input
    //                     key={index}
    //                     type="text"
    //                     placeholder={`Mark ${index + 1}`}
    //                     className="block w-full mt-2 border rounded-md shadow-sm focus:ring-indigo-600"
    //                     value={mark}
    //                     onChange={(e) => {
    //                       const newMarks = [...identificationMarks];
    //                       newMarks[index] = e.target.value;
    //                       setIdentificationMarks(newMarks);
    //                     }}
    //                   />
    //                 ))}
    //               </div>
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Reliability</label>
    //               <Textarea
    //                 placeholder="Enter reliability details"
    //                 value={reliability}
    //                 onChange={(e) => setReliability(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Previous Consultation</label>
    //               <Textarea
    //                 placeholder="Enter details about previous consultations"
    //                 value={previousConsultation}
    //                 onChange={(e) => setPreviousConsultation(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Consultation Details</label>
    //               <Textarea
    //                 placeholder="Enter consultation details"
    //                 value={consultationDetails}
    //                 onChange={(e) => setConsultationDetails(e.target.value)}
    //               />
    //             </div>



    //             {/* Personal History */}
    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Birth and Early Development</label>
    //               <Textarea
    //                 placeholder="Describe birth, delivery nature, complications, milestones"
    //                 value={birthDevelopment}
    //                 onChange={(e) => setBirthDevelopment(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Childhood Disorders</label>
    //               <Textarea
    //                 placeholder="Describe any childhood disorders like hyperactivity, tics, etc."
    //                 value={childhoodDisorders}
    //                 onChange={(e) => setChildhoodDisorders(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Home Atmosphere</label>
    //               <Textarea
    //                 placeholder="Describe home atmosphere in childhood and adolescence"
    //                 value={homeAtmosphere}
    //                 onChange={(e) => setHomeAtmosphere(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Scholastic and Extracurricular Activities</label>
    //               <Textarea
    //                 placeholder="Describe scholastic and extracurricular involvement"
    //                 value={scholasticActivities}
    //                 onChange={(e) => setScholasticActivities(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Vocation/Occupation</label>
    //               <Textarea
    //                 placeholder="Describe occupation history, promotions, and reasons for leaving"
    //                 value={vocationHistory}
    //                 onChange={(e) => setVocationHistory(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Menstrual History</label>
    //               <Textarea
    //                 placeholder="Provide details about menstrual history and associated symptoms"
    //                 value={menstrualHistory}
    //                 onChange={(e) => setMenstrualHistory(e.target.value)}
    //               />
    //             </div>



    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Sexual and Marital History</label>
    //               <Textarea
    //                 placeholder="Describe sexual activities, attitudes, age at marriage, parental consent, age, health, occupation, and personality of spouse, role allocation, premarital/extramarital relations."
    //                 value={sexualMaritalHistory}
    //                 onChange={(e) => setSexualMaritalHistory(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Forensic History</label>
    //               <Textarea
    //                 placeholder="Describe any trouble with police, law charges, convictions, and status of cases."
    //                 value={forensicHistory}
    //                 onChange={(e) => setForensicHistory(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">General Pattern of Living</label>
    //               <Textarea
    //                 placeholder="Describe current living conditions, best period, and characteristic ways of handling adversity (give examples)."
    //                 value={generalPatternLiving}
    //                 onChange={(e) => setGeneralPatternLiving(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Premorbid Personality</label>
    //               <Textarea
    //                 placeholder="Self: How does the patient describe themselves? Strengths, abilities, shortcomings, resilience in adversity, hopes, and ambitions."
    //                 value={premorbidPersonality}
    //                 onChange={(e) => setPremorbidPersonality(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Relations</label>
    //               <Textarea
    //                 placeholder="Does the patient prefer company or solitude? Shyness, relationship closeness, handling others’ mistakes, attention-seeking behavior, criticism tolerance."
    //                 value={relations}
    //                 onChange={(e) => setRelations(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Work and Leisure</label>
    //               <Textarea
    //                 placeholder="Relation with work-mates or superiors, hobbies or interests, affiliations with societies, clubs, or organizations."
    //                 value={workLeisure}
    //                 onChange={(e) => setWorkLeisure(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Mood</label>
    //               <Textarea
    //                 placeholder="Describe the patient’s mood: changeability, expression of feelings (love, anger, frustration, sadness), control over feelings, and history of violence."
    //                 value={mood}
    //                 onChange={(e) => setMood(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Character</label>
    //               <Textarea
    //                 placeholder="Is the patient reserved, timid, self-conscious, resentful, jealous, irritable, selfish, or self-centered?"
    //                 value={character}
    //                 onChange={(e) => setCharacter(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Attitudes and Standards</label>
    //               <Textarea
    //                 placeholder="Attitudes towards body, health, illness, religious or moral standards."
    //                 value={attitudesStandards}
    //                 onChange={(e) => setAttitudesStandards(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Habits</label>
    //               <Textarea
    //                 placeholder="Use of tobacco, alcohol, drugs; comment on food and sleep patterns."
    //                 value={habits}
    //                 onChange={(e) => setHabits(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Mental Status Examination: General Appearance</label>
    //               <Textarea
    //                 placeholder="Describe general physical appearance, estimate of age, body build, dress, hygiene, grooming, eye contact, facial expression, posture, and signs of anxiety."
    //                 value={generalAppearance}
    //                 onChange={(e) => setGeneralAppearance(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Attitude</label>
    //               <Textarea
    //                 placeholder="Describe the patient’s attitude: cooperative, uncooperative, attentive, evasive, guarded, suspicious, hostile, etc."
    //                 value={attitude}
    //                 onChange={(e) => setAttitude(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Motor Behavior</label>
    //               <Textarea
    //                 placeholder="Comment on inactivity, hyperactivity, aggression, abnormal movements or postures, catatonic features, etc."
    //                 value={motorBehavior}
    //                 onChange={(e) => setMotorBehavior(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Speech</label>
    //               <Textarea
    //                 placeholder="Describe intensity, tone, quality, coherence, goal direction, and ease of speech."
    //                 value={speech}
    //                 onChange={(e) => setSpeech(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Cognitive Functions</label>
    //               <Textarea
    //                 placeholder="Assess attention and concentration, orientation, memory, abstract ability, general information, calculation, and intelligence."
    //                 value={cognitiveFunctions}
    //                 onChange={(e) => setCognitiveFunctions(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Mood and Affect</label>
    //               <Textarea
    //                 placeholder="Comment on appropriateness, type, range, and nonverbal behavior."
    //                 value={moodAffect}
    //                 onChange={(e) => setMoodAffect(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Thought</label>
    //               <Textarea
    //                 placeholder="Document samples of speech: stream, form, possession, content."
    //                 value={thought}
    //                 onChange={(e) => setThought(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Perceptual Disorders</label>
    //               <Textarea
    //                 placeholder="Comment on sensory distortion, deception, and other phenomena."
    //                 value={perceptualDisorders}
    //                 onChange={(e) => setPerceptualDisorders(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Judgment</label>
    //               <Textarea
    //                 placeholder="Assess personal and social judgment."
    //                 value={judgment}
    //                 onChange={(e) => setJudgment(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Insight</label>
    //               <Textarea
    //                 placeholder="Assess the level of insight regarding their illness."
    //                 value={insight}
    //                 onChange={(e) => setInsight(e.target.value)}
    //               />
    //             </div>

    //             <div className="w-full sm:col-span-4">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Diagnostic Remarks</label>
    //               <Textarea
    //                 placeholder="Provide impressions, differential diagnoses, and treatment plans."
    //                 value={diagnosticFormulation}
    //                 onChange={(e) => setDiagnosticFormulation(e.target.value)}
    //               />
    //             </div>



    //         {/* all online test added by admin */}

    //         <label>Recomeded tests according to doctor</label>
    //   <div className="w-full sm:col-span-4">
    //     {onlineTests.map((test) => (
    //       <div key={test._id} className="flex items-center mb-2">
    //         <Input
    //           type="checkbox"
    //           id={test._id}
    //           name={test.onlineTestName}
    //           className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
    //           checked={selectedTests.includes(test._id)} // Controlled checkbox state
    //           onChange={() => handleCheckboxChange(test._id)} // Handle checkbox change
    //         />
    //         <label htmlFor={test._id} className="ml-2 block text-sm text-gray-900">
    //           {test.onlineTestName}
    //         </label>
    //       </div>
    //     ))}
    //   {/* </div> */}

    //             </div>

    //           </div>



    //           <div className="mt-6 flex items-center justify-end gap-x-6">
    //             {loading ? (
    //               <SpecialLoadingButton content={"Updating"} width={"w-52"} />
    //             ) : (
    //               <button
    //                 type="submit"
    //                 className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-52"
    //               >
    //                 Submit
    //               </button>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    //   </div>
    // </>




    <div className="diagnosysFormDiv">
      <div className="logoDiv">
        <img src={Logo} alt="" />
      </div>
      <div className="DiagnosisFormDiv">
        <form onSubmit={handleUpdateAppoinment} className="DiagnosisForm">
          <div className="formBody">
            <div className="FormBodyDiv1">
              <div className="FormBodyDiv11">
                <h2 className="FormBodyDiv11-header">CASE RECORD FORM</h2>
                <h2 className="FormBodyDiv11-header">
                  APPOINTMENT NO. {appointmentNo}
                </h2>
                <button
                  onClick={handleReturnToDashboard}
                  className="FormBodyDiv11-returnButton"
                >
                  Return to Dashboard
                </button>
              </div>

              <div className="FormBodyDiv12">
                {/* Patient Details */}
                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">Client Name</label>
                  <input
                    disabled
                    type="text"
                    className="FormBodyDiv12-div-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">Booked Date</label>
                  <input
                    disabled
                    type="text"
                    className="FormBodyDiv12-div-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">Booked Time</label>
                  <input
                    disabled
                    type="text"
                    className="FormBodyDiv12-div-input"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Problem Desc
                  </label>
                  <input
                    type="text"
                    className="FormBodyDiv12-div-input"
                    value={patientProblemDesc}
                    onChange={(e) => setPatientProblemDesc(e.target.value)}
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">Client Age</label>
                  <input
                    type="number"
                    className="FormBodyDiv12-div-input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">Client Gender</label>
                  <select name="sex" class="form-select">
                    <option value="" disabled selected>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Gay">Gay</option>
                    <option value="Lesbian">Lesbian</option>
                  </select>
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Address
                  </label>
                  <textarea
                    disabled
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Contact No.
                  </label>
                  <input
                    disabled
                    type="text"
                    className="FormBodyDiv12-div-input"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Education
                  </label>
                  <input
                    type="text"
                    className="FormBodyDiv12-div-input"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Occupation
                  </label>
                  <input
                    type="text"
                    className="FormBodyDiv12-div-input"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Marital Status
                  </label>
                  <select name="maritalStatus" className="form-select">
                    <option value="" disabled selected>
                      Select Client Marital Status
                    </option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Separated">Separated</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widower">Widower</option>
                    <option value="Remarried">Remarried</option>
                  </select>
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Residence
                  </label>
                  <select name="residence" className="form-select">
                    <option value="" disabled selected>
                      Select Client Residence Type
                    </option>
                    <option value="Rented">Rented</option>
                    <option value="Owned">Owned</option>
                    <option value="Family">Family</option>
                  </select>
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Family
                  </label>
                  <textarea
                    placeholder="Details about family"
                    value={family}
                    onChange={(e) => setFamily(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Members in Client Family
                  </label>
                  <input
                    type="number"
                    className="FormBodyDiv12-div-input"
                    value={membersInFamily}
                    onChange={(e) => setMembersInFamily(e.target.value)}
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Identification Marks
                  </label>
                  <div className="flex gap-2">
                    {identificationMarks.map((mark, index) => (
                      <input
                        key={index}
                        type="text"
                        // placeholder={Mark ${index + 1}}
                        className="FormBodyDiv12-div-input"
                        value={mark}
                        onChange={(e) => {
                          const newMarks = [...identificationMarks];
                          newMarks[index] = e.target.value;
                          setIdentificationMarks(newMarks);
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Reliability
                  </label>
                  <textarea
                    className="FormBodyDiv12-div-input"
                    placeholder="Enter reliability details"
                    value={reliability}
                    onChange={(e) => setReliability(e.target.value)}
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Previous Consultation / Hospitalization
                  </label>
                  <textarea
                    placeholder="Enter details about previous consultations"
                    value={previousConsultation}
                    onChange={(e) => setPreviousConsultation(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Consultation Details
                  </label>
                  <textarea
                    placeholder="Enter consultation details"
                    value={consultationDetails}
                    onChange={(e) => setConsultationDetails(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                {/* Personal History */}
                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Birth and Early Development
                  </label>
                  <textarea
                    placeholder="Describe birth, delivery nature, complications, milestones"
                    value={birthDevelopment}
                    onChange={(e) => setBirthDevelopment(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Childhood Disorders
                  </label>
                  <textarea
                    placeholder="Describe any childhood disorders like hyperactivity, tics, etc."
                    value={childhoodDisorders}
                    onChange={(e) => setChildhoodDisorders(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Home Atmosphere
                  </label>
                  <textarea
                    placeholder="Describe home atmosphere in childhood and adolescence"
                    value={homeAtmosphere}
                    onChange={(e) => setHomeAtmosphere(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Scholastic and Extracurricular Activities
                  </label>
                  <textarea
                    placeholder="Describe scholastic and extracurricular involvement"
                    value={scholasticActivities}
                    onChange={(e) => setScholasticActivities(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Vocation/Occupation
                  </label>
                  <textarea
                    placeholder="Describe occupation history, promotions, and reasons for leaving"
                    value={vocationHistory}
                    onChange={(e) => setVocationHistory(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Menstrual History
                  </label>
                  <textarea
                    placeholder="Provide details about menstrual history and associated symptoms"
                    value={menstrualHistory}
                    onChange={(e) => setMenstrualHistory(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Sexual and Marital History
                  </label>
                  <textarea
                    placeholder="Describe sexual activities, attitudes, age at marriage, parental consent, age, health, occupation, and personality of spouse, role allocation, premarital/extramarital relations."
                    value={sexualMaritalHistory}
                    onChange={(e) => setSexualMaritalHistory(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Forensic History
                  </label>
                  <textarea
                    placeholder="Describe any trouble with police, law charges, convictions, and status of cases."
                    value={forensicHistory}
                    onChange={(e) => setForensicHistory(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client General Pattern of Living
                  </label>
                  <textarea
                    placeholder="Describe current living conditions, best period, and characteristic ways of handling adversity (give examples)."
                    value={generalPatternLiving}
                    onChange={(e) => setGeneralPatternLiving(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Premorbid Personality
                  </label>
                  <textarea
                    placeholder="Self: How does the patient describe themselves? Strengths, abilities, shortcomings, resilience in adversity, hopes, and ambitions."
                    value={premorbidPersonality}
                    onChange={(e) => setPremorbidPersonality(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Relations
                  </label>
                  <textarea
                    placeholder="Does the patient prefer company or solitude? Shyness, relationship closeness, handling others’ mistakes, attention-seeking behavior, criticism tolerance."
                    value={relations}
                    onChange={(e) => setRelations(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Work and Leisure
                  </label>
                  <textarea
                    placeholder="Relation with work-mates or superiors, hobbies or interests, affiliations with societies, clubs, or organizations."
                    value={workLeisure}
                    onChange={(e) => setWorkLeisure(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">Client Mood</label>
                  <textarea
                    placeholder="Describe the patient’s mood: changeability, expression of feelings (love, anger, frustration, sadness), control over feelings, and history of violence."
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Character
                  </label>
                  <textarea
                    placeholder="Is the patient reserved, timid, self-conscious, resentful, jealous, irritable, selfish, or self-centered?"
                    value={character}
                    onChange={(e) => setCharacter(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Attitudes and Standards
                  </label>
                  <textarea
                    placeholder="Attitudes towards body, health, illness, religious or moral standards."
                    value={attitudesStandards}
                    onChange={(e) => setAttitudesStandards(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Habits
                  </label>
                  <textarea
                    placeholder="Use of tobacco, alcohol, drugs; comment on food and sleep patterns."
                    value={habits}
                    onChange={(e) => setHabits(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Mental Status Examination: General Appearance
                  </label>
                  <textarea
                    placeholder="Describe general physical appearance, estimate of age, body build, dress, hygiene, grooming, eye contact, facial expression, posture, and signs of anxiety."
                    value={generalAppearance}
                    onChange={(e) => setGeneralAppearance(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Attitude
                  </label>
                  <textarea
                    placeholder="Describe the patient’s attitude: cooperative, uncooperative, attentive, evasive, guarded, suspicious, hostile, etc."
                    value={attitude}
                    onChange={(e) => setAttitude(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Motor Behavior
                  </label>
                  <textarea
                    placeholder="Comment on inactivity, hyperactivity, aggression, abnormal movements or postures, catatonic features, etc."
                    value={motorBehavior}
                    onChange={(e) => setMotorBehavior(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Speech
                  </label>
                  <textarea
                    placeholder="Describe intensity, tone, quality, coherence, goal direction, and ease of speech."
                    value={speech}
                    onChange={(e) => setSpeech(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Cognitive Functions
                  </label>
                  <textarea
                    placeholder="Assess attention and concentration, orientation, memory, abstract ability, general information, calculation, and intelligence."
                    value={cognitiveFunctions}
                    onChange={(e) => setCognitiveFunctions(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Mood and Affect
                  </label>
                  <textarea
                    placeholder="Comment on appropriateness, type, range, and nonverbal behavior."
                    value={moodAffect}
                    onChange={(e) => setMoodAffect(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Thought
                  </label>
                  <textarea
                    placeholder="Document samples of speech: stream, form, possession, content."
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Perceptual Disorders
                  </label>
                  <textarea
                    placeholder="Comment on sensory distortion, deception, and other phenomena."
                    value={perceptualDisorders}
                    onChange={(e) => setPerceptualDisorders(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Judgment
                  </label>
                  <textarea
                    placeholder="Assess personal and social judgment."
                    value={judgment}
                    onChange={(e) => setJudgment(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Insight
                  </label>
                  <textarea
                    placeholder="Assess the level of insight regarding their illness."
                    value={insight}
                    onChange={(e) => setInsight(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                <div className="FormBodyDiv12-div">
                  <label className="FormBodyDiv12-div-label">
                    Client Diagnostic Remarks
                  </label>
                  <textarea
                    placeholder="Provide impressions, differential diagnoses, and treatment plans."
                    value={diagnosticFormulation}
                    onChange={(e) => setDiagnosticFormulation(e.target.value)}
                    className="FormBodyDiv12-div-input"
                  />
                </div>

                {/* all online test added by admin */}

                <label className="FormBodyDiv12-div-label">Client Recomeded tests according to Counsellor</label>
                <div className="FormBodyDiv12-div">
                  {onlineTests.map((test) => (
                    <div key={test._id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={test._id}
                        name={test.onlineTestName}
                        className="OnlineTestRecommendedByDoctor-input"
                        checked={selectedTests.includes(test._id)} // Controlled checkbox state
                        onChange={() => handleCheckboxChange(test._id)} // Handle checkbox change
                      />
                      <label
                        htmlFor={test._id}
                        className="OnlineTestRecommendedByDoctor-label"
                      >
                        {test.onlineTestName}
                      </label>
                    </div>
                  ))}
                  {/* </div> */}
                </div>
              </div>

              <div className="DiagnosisFormSubmitButtonDiv">
                {loading ? (
                  <button
                    type="submit"
                    className="DiagnosisFormSubmitButton"
                  >
                    Submitting...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="DiagnosisFormSubmitButton"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAppoinment;
