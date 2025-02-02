import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import ContactInformationForm from "./ContactInformationForm";
import FormHeader from "./FormHeader";
import PersonalDetailsForm from "./PersonalDetailsForm";
import PostcodeForm from "./PostcodeForm";
import ProgressBar from "./ProgressBar";
import SignatureForm from "./SignatureForm";

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

const MultiStepForm: React.FC = () => {
  const [stage, setStage] = useState<Stage>("address");
  const [direction, setDirection] = useState<1 | -1>(1);

  const [postcode, setPostcode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [signature, setSignature] = useState<string | null>(null);

  const changeStage = (nextStage?: Stage, moveForward: boolean = true) => {
    if (nextStage) {
      setDirection(moveForward ? 1 : -1);
      setStage(nextStage);
    }
  };

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
    setStage("address");
    setPostcode("");
    setSelectedAddress("");
    setTitle("");
    setFirstName("");
    setLastName("");
    setDob("");
    setPhoneNumber("");
    setEmail("");
    setSignature(null);
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

  const swipeVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    }),
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-6 shadow-md transition-all duration-300">
        <FormHeader />
        {stage !== "success" && <ProgressBar progress={progress} />}

        <AnimatePresence custom={direction} mode="wait">
          {stage === "address" && (
            <motion.div
              key="address"
              variants={swipeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
            >
              <PostcodeForm
                postcode={postcode}
                setPostcode={setPostcode}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                onNext={() => changeStage(stageFlow.address.next)}
              />
            </motion.div>
          )}

          {stage === "personalDetails" && (
            <motion.div
              key="personalDetails"
              variants={swipeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
            >
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
            </motion.div>
          )}

          {stage === "contactInformation" && (
            <motion.div
              key="contactInformation"
              variants={swipeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
            >
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
            </motion.div>
          )}

          {stage === "signature" && (
            <motion.div
              key="signature"
              variants={swipeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
            >
              <SignatureForm
                signature={signature}
                setSignature={setSignature}
                onBack={() => changeStage(stageFlow.signature.prev, false)}
                onSubmit={handleFormCompletion}
              />
            </motion.div>
          )}

          {stage === "success" && (
            <motion.div
              key="success"
              variants={swipeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
              className="text-center"
            >
              <FiCheckCircle className="mx-auto text-6xl text-emerald-500" />
              <h2 className="mt-4 text-lg font-semibold text-gray-700">
                Thank you for submitting!
              </h2>
              <p className="text-sm text-gray-600">
                Your information has been successfully recorded.
              </p>

              <button
                onClick={resetForm}
                className="mt-4 w-full cursor-pointer rounded-lg bg-gray-400 px-4 py-3 text-lg font-semibold text-white shadow-inner shadow-gray-300 transition hover:bg-gray-500"
              >
                Start New Form
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultiStepForm;
