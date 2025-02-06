import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ContactInformationForm from "./ContactInformationForm";
import FormComplete from "./FormComplete";
import FormHeader from "./FormHeader";
import PersonalDetailsForm from "./PersonalDetailsForm";
import PostcodeForm from "./PostcodeForm";
import ProgressBar from "./ProgressBar";
import SignatureForm from "./SignatureForm";
import StepWrapper from "./StepWrapper";

type Stage =
  | "address"
  | "personalDetails"
  | "contactInformation"
  | "signature"
  | "success";

const stageFlow: Record<Stage, { next?: Stage; prev?: Stage }> = {
  address: { next: "personalDetails" },
  personalDetails: { next: "contactInformation", prev: "address" },
  contactInformation: { next: "signature", prev: "personalDetails" },
  signature: { next: "success", prev: "contactInformation" },
  success: { prev: "signature" },
};

const useFormNavigation = () => {
  const [stage, setStage] = useState<Stage>("address");
  const [direction, setDirection] = useState<1 | -1>(1);

  const changeStage = (nextStage?: Stage, moveForward: boolean = true) => {
    if (nextStage) {
      setDirection(moveForward ? 1 : -1);
      setStage(nextStage);
    }
  };

  return { stage, direction, changeStage };
};

const MultiStepForm: React.FC = () => {
  const { stage, direction, changeStage } = useFormNavigation();

  const [postcode, setPostcode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [signature, setSignature] = useState<string | null>(null);

  const handleFormCompletion = () => {
    console.log("Form submitted successfully!", {
      postcode,
      selectedAddress,
      title,
      firstName,
      lastName,
      dob,
      phoneNumber,
      email,
      signature,
    });

    changeStage("success");
  };

  const resetForm = () => {
    setPostcode("");
    setSelectedAddress("");
    setTitle("");
    setFirstName("");
    setLastName("");
    setDob("");
    setPhoneNumber("");
    setEmail("");
    setSignature(null);
    changeStage("address");
  };

  const totalFields = 6;
  const filledFields = [
    selectedAddress,
    title,
    firstName.trim() !== "" && lastName.trim() !== "" ? "combinedName" : "",
    dob,
    phoneNumber && email ? "contactInfo" : "",
    signature ? "signed" : "",
  ].filter((field) => field.trim() !== "").length;
  const progress = (filledFields / totalFields) * 100;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-6 shadow-md transition-all duration-300">
        <FormHeader />
        {stage !== "success" && <ProgressBar progress={progress} />}

        <AnimatePresence mode="wait" custom={direction}>
          {stage === "address" && (
            <StepWrapper direction={direction} key="address">
              <PostcodeForm
                postcode={postcode}
                setPostcode={setPostcode}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                onNext={() => changeStage(stageFlow.address.next)}
              />
            </StepWrapper>
          )}

          {stage === "personalDetails" && (
            <StepWrapper direction={direction} key="personalDetails">
              <PersonalDetailsForm
                title={title}
                setTitle={setTitle}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                dob={dob}
                setDob={setDob}
                onBack={() =>
                  changeStage(stageFlow.personalDetails.prev, false)
                }
                onNext={() => changeStage(stageFlow.personalDetails.next)}
              />
            </StepWrapper>
          )}

          {stage === "contactInformation" && (
            <StepWrapper direction={direction} key="contactInformation">
              <ContactInformationForm
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                email={email}
                setEmail={setEmail}
                onBack={() =>
                  changeStage(stageFlow.contactInformation.prev, false)
                }
                onNext={() => changeStage(stageFlow.contactInformation.next)}
              />
            </StepWrapper>
          )}

          {stage === "signature" && (
            <StepWrapper direction={direction} key="signature">
              <SignatureForm
                signature={signature}
                setSignature={setSignature}
                onBack={() => changeStage(stageFlow.signature.prev, false)}
                onSubmit={handleFormCompletion}
              />
            </StepWrapper>
          )}

          {stage === "success" && (
            <StepWrapper direction={direction} key="success">
              <FormComplete onReset={resetForm} />
            </StepWrapper>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultiStepForm;
