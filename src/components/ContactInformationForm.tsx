import { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiMail, FiPhone } from "react-icons/fi";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { validateEmail, validatePhoneNumber } from "../utils/inputValidation";
import TextInput from "./TextInput";

interface ContactInformationProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const ContactInformationForm: React.FC<ContactInformationProps> = ({
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  onBack,
  onNext,
}) => {
  const updateUser = useUpdateUser();
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    if (!validatePhoneNumber(value)) {
      setPhoneNumberError("Enter a valid phone number.");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();

    const isPhoneValid = validatePhoneNumber(phoneNumber);
    const isEmailValid = validateEmail(email);

    setPhoneNumberError(isPhoneValid ? "" : "Enter a valid phone number.");
    setEmailError(isEmailValid ? "" : "Enter a valid email address.");

    if (isPhoneValid && isEmailValid) {
      updateUser.mutate({ phoneNumber, email }, { onSuccess: onNext });
    }
  };

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-700">
        Contact Information
      </h2>

      <form className="space-y-3" onSubmit={validateForm}>
        <div className="relative mt-4">
          <TextInput
            value={phoneNumber}
            setValue={handlePhoneNumberChange}
            placeholder="Phone number"
            validate={validatePhoneNumber}
            icon={<FiPhone />}
            maxLength={15}
          />
          {phoneNumberError && (
            <p className="mt-1 text-sm text-red-500">{phoneNumberError}</p>
          )}
        </div>

        <div>
          <TextInput
            value={email}
            setValue={handleEmailChange}
            placeholder="Email address"
            validate={validateEmail}
            icon={<FiMail />}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-500">{emailError}</p>
          )}
        </div>

        <div className="mt-4 flex justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-400 px-2 py-2 text-lg font-semibold text-white shadow-inner shadow-gray-300 transition hover:bg-gray-500"
          >
            <FiArrowLeft className="text-xl" />
          </button>

          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-4 text-lg font-semibold text-white shadow-inner shadow-emerald-200 transition hover:bg-emerald-600"
          >
            Next
            <FiArrowRight className="text-xl" />
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactInformationForm;
