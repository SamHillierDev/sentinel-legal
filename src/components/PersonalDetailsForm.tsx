import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiUser } from "react-icons/fi";
import { useUpdateUser } from "../hooks/useUpdateUser";
import {
  MAX_NAME_LENGTH,
  validateDob,
  validateName,
} from "../utils/inputValidation";
import SelectInput from "./SelectInput";
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
  const [nameErrors, setNameErrors] = useState<{
    firstName: string;
    lastName: string;
  }>({
    firstName: "",
    lastName: "",
  });
  const [dobError, setDobError] = useState("");
  const [dobTouched, setDobTouched] = useState(false);
  const [dobIsValid, setDobIsValid] = useState(true);

  const handleNameChange = (
    nameType: "firstName" | "lastName",
    value: string,
    setter: (value: string) => void,
  ) => {
    setter(value);
    let error = "";

    if (value.length > MAX_NAME_LENGTH) {
      error = `${nameType === "firstName" ? "First" : "Last"} name must be ${MAX_NAME_LENGTH} characters or fewer.`;
    } else if (!validateName(value)) {
      error = `${nameType === "firstName" ? "First" : "Last"} name is required and must contain only letters.`;
    }

    setNameErrors((prevErrors) => ({ ...prevErrors, [nameType]: error }));
  };

  const handleDobChange = (value: string) => {
    setDob(value);
    if (!validateDob(value)) {
      setDobError("You must be between 18 and 100 years old.");
    } else {
      setDobError("");
    }
  };

  const handleDobBlur = () => {
    setDobTouched(true);
    setDobIsValid(validateDob(dob));
  };

  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();

    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName);
    const isDobValid = validateDob(dob);

    setNameErrors((prevErrors) => ({
      firstName: prevErrors.firstName.includes("characters or fewer")
        ? prevErrors.firstName
        : isFirstNameValid
          ? ""
          : "First name is required and must contain only letters.",
      lastName: prevErrors.lastName.includes("characters or fewer")
        ? prevErrors.lastName
        : isLastNameValid
          ? ""
          : "Last name is required and must contain only letters.",
    }));

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
        <SelectInput
          options={["Mr", "Mrs", "Ms", "Dr"]}
          selectedValue={title}
          setSelectedValue={setTitle}
          placeholder="Select your title"
        />

        <div className="flex gap-4">
          {["firstName", "lastName"].map((nameType) => (
            <div key={nameType} className="flex-1">
              <label className="text-sm font-medium text-gray-600">
                {nameType === "firstName" ? "First Name" : "Last Name"}
              </label>
              <TextInput
                value={nameType === "firstName" ? firstName : lastName}
                setValue={(value) =>
                  handleNameChange(
                    nameType as "firstName" | "lastName",
                    value,
                    nameType === "firstName" ? setFirstName : setLastName,
                  )
                }
                placeholder={
                  nameType === "firstName" ? "First name" : "Last name"
                }
                validate={validateName}
                icon={<FiUser />}
              />
              {nameErrors[nameType as "firstName" | "lastName"] && (
                <p className="mt-1 text-sm text-red-500">
                  {nameErrors[nameType as "firstName" | "lastName"]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">
            Date of Birth
          </label>
          <motion.div
            className="relative"
            animate={
              dobTouched && !dobIsValid ? { x: [0, -5, 5, -5, 5, 0] } : {}
            }
            transition={{ duration: 0.3 }}
          >
            <input
              type="date"
              value={dob}
              onChange={(e) => handleDobChange(e.target.value)}
              onBlur={handleDobBlur}
              className={`w-full rounded-lg border px-3 py-3 shadow-inner shadow-gray-400 focus:border-blue-400 focus:ring-0 focus:outline-none ${
                dobTouched && !dobIsValid ? "border-red-500" : "border-gray-400"
              }`}
            />
          </motion.div>
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
