import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const { doctor } = useSelector((state) => state.doctor);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="text-balance text-muted-foreground">
                Full Profile Preview
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Profile Image</Label>
                  <img
                    src={doctor && doctor.doctorImage && doctor.doctorImage.url}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input type="text" defaultValue={doctor?.doctorName} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" defaultValue={doctor?.doctorEmailId} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input type="text" defaultValue={doctor?.doctorMobileNo} disabled />
              </div>

              <div className="grid gap-2">
                <Label>WhatsApp Number</Label>
                <Input type="text" defaultValue={doctor?.doctorWhatsappNo} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Specialisation</Label>
                <Input type="text" defaultValue={doctor?.doctorSpecialisation} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Location</Label>
                <Input type="text" defaultValue={doctor?.doctorLocation} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Address</Label>
                <Input type="text" defaultValue={doctor?.doctorAddress} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Qualifications</Label>
                <Textarea defaultValue={doctor?.doctorQualifications} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Experience</Label>
                <Textarea defaultValue={doctor?.experience} disabled />
              </div>

              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea defaultValue={doctor?.about} disabled />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
