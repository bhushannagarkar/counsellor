import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAlldoctorErrors,
  
  // getdoctor,
  resetProfile,
  updateProfile,
} from "@/store/slices/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Link } from "react-router-dom";
import { clearAllappointmentsErrors } from "@/store/slices/appointmentSlice";
import './Updateprofile.css'
const UpdateProfile = () => {
  const { doctor, loading, error, isUpdated, message } = useSelector(
    (state) => state.doctor
  );

  const [doctorName, setDoctorName] = useState(doctor && doctor.doctorName);
  
  const [doctorSpecialisation, setDoctorSpecialisation] = useState(doctor && doctor.doctorSpecialisation);
  
  const [doctorLocation, setdoctorLocation] = useState(doctor && doctor.doctorLocation);
  const [doctorAddress, setDoctorAddress] = useState(doctor && doctor.doctorAddress);
  const [doctorEmailId, setDoctorEmailId] = useState(doctor && doctor.doctorEmailId);
  const [doctorMobileNo, setDoctorMobileNo] = useState(doctor && doctor.doctorMobileNo);
  const [doctorWhatsappNo, setDoctorWhatsappNo] = useState(doctor && doctor.doctorWhatsappNo);
  
  const [doctorQualifications, setDoctorQualifications] = useState(doctor && doctor.doctorQualifications);
  const [experience, setDoctorExperience] = useState(doctor && doctor.experience);
  const [about, setDoctorAbout] = useState(doctor && doctor.about);
  // const [portfolioURL, setPortfolioURL] = useState(doctor && doctor.portfolioURL);

  // const [linkedInURL, setLinkedInURL] = useState(
  //   doctor && (doctor.linkedInURL === "undefined" ? "" : doctor.linkedInURL)
  // );

  const [doctorImage, setDoctorImage] = useState(doctor && doctor.doctorImage && doctor.doctorImage.url);
  
  const [avatarPreview, setAvatarPreview] = useState(
    doctor && doctor.doctorImage && doctor.doctorImage.url
  );


  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setDoctorImage(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("doctorName", doctorName);
    formData.append("doctorSpecialisation", doctorSpecialisation);
    formData.append("doctorLocation", doctorLocation);
    formData.append("doctorAddress", doctorAddress);
    formData.append("doctorEmailId", doctorEmailId);
    formData.append("doctorMobileNo", doctorMobileNo);
    formData.append("doctorWhatsappNo", doctorWhatsappNo);
    formData.append("doctorQualifications", doctorQualifications);
    formData.append("experience", experience);
    formData.append("about", about);
    formData.append("doctorImage", doctorImage);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAlldoctorErrors());
    }
    if (isUpdated) {
      // dispatch(getdoctor());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
    // dispatch(clearAllappointmentsErrors())
  }, [dispatch, loading, error, isUpdated]);

  return (
    <>
      <div className="update-container">
        <div>
          <div className="update-grid">
            <div className="update-heading-section">
              <h1 className="update-title">Update Profile</h1>
              <p className="update-subtitle">Update Your Profile Here</p>
            </div>
            <div className="update-form-grid">
              <div className="update-avatar-section">
                <div className="update-avatar-container">
                  <Label>Profile Image</Label>
                  <img
                    src={avatarPreview ? avatarPreview : "/avatarHolder.jpg"}
                    alt="avatar"
                    className="update-avatar"
                  />
                  <div className="update-avatar-input">
                    <input
                      type="file"
                      onChange={avatarHandler}
                      className="update-avatar-btn"
                    />
                  </div>
                </div>
              </div>
              <div className="update-input-grid">
                <div className="update-input-item">
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                  />
                </div>

                <div className="update-input-item">
                  <Label>Doctor Specialisation</Label>
                  <Input
                    type="text"
                    value={doctorSpecialisation}
                    onChange={(e) => setDoctorSpecialisation(e.target.value)}
                  />
                </div>

                <div className="update-input-item">
                  <Label>Doctor Location</Label>
                  <Input
                    type="text"
                    value={doctorLocation}
                    onChange={(e) => setdoctorLocation(e.target.value)}
                  />
                </div>

                <div className="update-input-item">
                  <Label>Doctor Address</Label>
                  <Input
                    type="text"
                    value={doctorAddress}
                    onChange={(e) => setDoctorAddress(e.target.value)}
                  />
                </div>

                <div className="update-input-item">
                  <Label>Email</Label>
                  <Input
                    readOnly
                    type="email"
                    value={doctorEmailId}
                    onChange={(e) => setDoctorEmailId(e.target.value)}
                  />
                </div>

                <div className="update-input-item">
                  <Label>Doctor Mobile No</Label>
                  <Input
                    type="text"
                    value={doctorMobileNo}
                    onChange={(e) => setDoctorMobileNo(e.target.value)}
                  />
                </div>

                <div className="update-input-item">
                  <Label>Doctor Whatsapp No</Label>
                  <Input
                    type="text"
                    value={doctorWhatsappNo}
                    onChange={(e) => setDoctorWhatsappNo(e.target.value)}
                  />
                </div>

                <div className="update-input-item">
                  <Label>Doctor Qualifications</Label>
                  <Textarea
                    value={doctorQualifications}
                    onChange={(e) => setDoctorQualifications(e.target.value)}
                  />
                </div>

                <div className="update-input-item">
                  <Label>Experience</Label>
                  <Textarea
                    value={experience}
                    onChange={(e) => setDoctorExperience(e.target.value)}
                  />
                </div>

                <div className="update-input-item">
                  <Label>About</Label>
                  <Textarea
                    value={about}
                    onChange={(e) => setDoctorAbout(e.target.value)}
                  />
                </div>

                {!loading ? (
                  <button
                    onClick={() => handleUpdateProfile()}
                    className="update-submit-btn"
                  >
                    Update Profile 
                  </button>
                ) : (
                  <SpecialLoadingButton content={"Updating"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
