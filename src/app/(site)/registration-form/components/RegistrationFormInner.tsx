"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import districts from "@/lib/districts.json";
import Paragraph from "@/components/common/Paragraph";

import { useRegistrationForm } from "../subcomponents/useRegistrationForm";

import CommonRegistrationFields, {
  AutofillSuppressionFields,
} from "../subcomponents/CommonRegistrationFields";

import type { RegistrationFormData } from "../subcomponents/useRegistrationForm";

import { ValidateRegistrationFormWithToast } from "../subcomponents/registrationFormValidation";

export const initialForm: RegistrationFormData = {
  StudentName: "",
  ParentName: "",
  StudentPhone: "",
  ParentPhone: "",
  StudentEmail: "",
  Address: "",
  City: "",
  State: "",
  District: "",
  PinCode: "",
};

const RegistrationFormInner = () => {
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);

  const { formData, handleChange, handleSubmit, loading, setFormData } =
    useRegistrationForm({
      validateForm: (formData: RegistrationFormData) =>
        ValidateRegistrationFormWithToast(formData, true, true),
      onSubmit: async (payload) => {
        try {
          const backendPayload = {
            name: payload.StudentName,
            phone_number: payload.ParentPhone
              ? `+91${payload.ParentPhone}`
              : null,
            email: payload.StudentEmail || null,
            token: payload.token,
          };

          const googleScriptPayload = {
            StudentName: payload.StudentName || "",
            StudentPhone: payload.StudentPhone
              ? `+91${payload.StudentPhone}`
              : "",
            StudentEmail: payload.StudentEmail || "",
            ParentName: payload.ParentName || "",
            ParentPhone: payload.ParentPhone ? `+91${payload.ParentPhone}` : "",
            State: payload.State || "",
            PinCode: payload.PinCode || "",
            Address: payload.Address || "",
            City: payload.City || "",
            District: payload.District || "",
          };

          await fetch(
            "https://script.google.com/macros/s/AKfycbxQ0OGd2A5Tvs0_MQxcUWtWfwEmyAyHpdY6mcUXZKj87QXG0JP2ilZ9CTQxmhfkP6_r/exec",
            {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams(googleScriptPayload),
            },
          );

          const response =
            await import("@/services/appoinmentRequestService").then((m) =>
              m.createAppoinmentRequest(backendPayload),
            );

          if (!response || response.responseCode !== "INSERT_SUCCESS") {
            toast.error("Failed to submit the form. Please try again.");
            return;
          }

          toast.success("Form submitted successfully!");
          setFormData(initialForm);
        } catch (err) {
          console.error(err);
          toast.error("Failed to submit the form. Please try again.");
        }
      },
      requiredName: true,
    });

  useEffect(() => {
    if (
      formData.State &&
      (districts as Record<string, string[]>)[formData.State]
    ) {
      setDistrictOptions(
        (districts as Record<string, string[]>)[formData.State],
      );
    } else {
      setDistrictOptions([]);
    }
  }, [formData.State]);

  const mergedFormData = {
    ...formData,
    name: formData.StudentName,
    email: formData.StudentEmail,
    mobile: formData.StudentPhone,
    message: "",
    agree: false,
  };

  const handleClear = () => setFormData(initialForm);

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-20">
        <AutofillSuppressionFields />

        <CommonRegistrationFields
          formData={mergedFormData}
          handleChange={handleChange}
          fieldsToShow={[
            "StudentName",
            "ParentName",
            "StudentPhone",
            "ParentPhone",
            "StudentEmail",
            "City",
            "State",
            "District",
            "PinCode",
            "Address",
          ]}
          loading={loading}
          districts={districts}
          districtOptions={districtOptions}
          toast={toast}
        />
      </div>

      <div className="w-full flex flex-row justify-between my-4 gap-2">
        <button
          className="relative flex justify-center items-center gap-1 rounded-full bg-(--blue) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-3 py-1"
          onClick={handleClear}
          type="button"
        >
          <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-(--yellow) transition-all duration-300 group-hover:text-(--blue)">
            Clear
          </span>
          <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
        </button>
        <button
          type="submit"
          className="relative flex justify-center items-center rounded-full bg-transparent overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 min-w-27.5"
          disabled={loading}
          style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
        >
          <span className="relative z-20 text-center no-underline w-full px-2 py-1 text-(--yellow) text-base transition-all duration-300 group-hover:text-(--blue)">
            {loading ? "Submitting..." : "Submit"}
          </span>
          <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
        </button>
      </div>
      <Paragraph size="base" className="mt-8 text-(--yellow)">
        Note: Admission and fee details will be shared after you submit the
        enquiry form.
      </Paragraph>
    </form>
  );
};

export default RegistrationFormInner;
