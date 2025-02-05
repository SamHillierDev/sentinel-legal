import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiUser } from "react-icons/fi";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { validateDob, validateName } from "../utils/inputValidation";
import TextInput from "./TextInput";

interface PersonalDetailsProps {
  title: string;
  setTitle: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  dob: string;
  setDob: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsProps> = ({
  title,
  setTitle,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  dob,
  setDob,
  onBack,
  onNext,
}) => {
  const updateUser = useUpdateUser();
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dobError, setDobError] = useState("");

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    if (!validateName(value)) {
      setFirstNameError(
        "First name is required and must contain only letters.",
      );
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    if (!validateName(value)) {
      setLastNameError("Last name is required and must contain only letters.");
    } else {
      setLastNameError("");
    }
  };

  const handleDobChange = (value: string) => {
    setDob(value);
    if (!validateDob(value)) {
      setDobError("You must be between 18 and 100 years old.");
    } else {
      setDobError("");
    }
  };

  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();

    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName);
    const isDobValid = validateDob(dob);

    setFirstNameError(
      isFirstNameValid
        ? ""
        : "First name is required and must contain only letters.",
    );
    setLastNameError(
      isLastNameValid
        ? ""
        : "Last name is required and must contain only letters.",
    );
    setDobError(isDobValid ? "" : "You must be between 18 and 100 years old.");

    if (isFirstNameValid && isLastNameValid && isDobValid) {
      updateUser.mutate(
        { title, firstName, lastName, dob },
        { onSuccess: onNext },
      );
    }
  };

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-700">
        Your personal details
      </h2>

      <form className="space-y-3" onSubmit={validateForm}>
        <div className="relative mt-4">
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-400 bg-white p-3 pr-10 focus:border-blue-400 focus:ring focus:outline-none"
          >
            <option disabled value="">
              Select your title
            </option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
          <FaChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600">
              First Name
            </label>
            <TextInput
              value={firstName}
              setValue={handleFirstNameChange}
              placeholder="First name"
              validate={validateName}
              icon={<FiUser />}
            />
            {firstNameError && (
              <p className="mt-1 text-sm text-red-500">{firstNameError}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600">
              Last Name
            </label>
            <TextInput
              value={lastName}
              setValue={handleLastNameChange}
              placeholder="Last name"
              validate={validateName}
              icon={<FiUser />}
            />
            {lastNameError && (
              <p className="mt-1 text-sm text-red-500">{lastNameError}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => handleDobChange(e.target.value)}
            className={`w-full rounded-lg border px-3 py-3 shadow-inner shadow-gray-400 focus:outline-none ${
              dobError ? "border-red-500" : "border-gray-400"
            }`}
          />
          {dobError && <p className="mt-1 text-sm text-red-500">{dobError}</p>}
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

export default PersonalDetailsForm;
