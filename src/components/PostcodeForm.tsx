import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useFetchPostcode } from "../hooks/useFetchPostcode";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { validatePostcode } from "../utils/inputValidation";
import AddressDropdown from "./AddressDropdown";
import SearchButton from "./SearchButton";
import SelectedAddressDisplay from "./SelectedAddressDisplay";
import TextInput from "./TextInput";

interface PostcodeFormProps {
  postcode: string;
  setPostcode: (value: string) => void;
  selectedAddress: string;
  setSelectedAddress: (value: string) => void;
  onNext: () => void;
}

const PostcodeForm: React.FC<PostcodeFormProps> = ({
  postcode,
  setPostcode,
  selectedAddress,
  setSelectedAddress,
  onNext,
}) => {
  const updateUser = useUpdateUser();
  const [hasSearched, setHasSearched] = useState(false);
  const [postcodeError, setPostcodeError] = useState("");

  const { addresses, message, searchPostcode, setMessage } =
    useFetchPostcode(postcode);

  const handlePostcodeChange = (value: string) => {
    setPostcode(value.toUpperCase());
    setSelectedAddress("");
    setHasSearched(false);
    setPostcodeError("");
    setMessage("");
  };

  const handleSearchPostcode = (e: React.FormEvent) => {
    e.preventDefault();

    if (!postcode.trim()) {
      setPostcodeError("Please enter a postcode.");
      return;
    }

    if (!validatePostcode(postcode)) {
      setPostcodeError("The postcode you entered is invalid.");
      return;
    }

    setPostcodeError("");
    setHasSearched(true);
    searchPostcode();
  };

  const handleFindAgreements = () => {
    if (!validatePostcode(postcode)) {
      setPostcodeError("The postcode you entered is invalid.");
      return;
    }

    if (!selectedAddress) {
      setPostcodeError("Please select an address.");
      return;
    }

    updateUser.mutate(
      { postcode, address: selectedAddress },
      { onSuccess: onNext },
    );
  };

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-700">
        Your current address
      </h2>

      <form onSubmit={handleSearchPostcode} className="mb-4">
        <div className="mt-4 flex w-full">
          <TextInput
            value={postcode}
            setValue={handlePostcodeChange}
            placeholder="Enter postcode"
            validate={validatePostcode}
            icon={<FaMapMarkerAlt />}
            maxLength={8}
            className={`rounded-r-none`}
          />
          <SearchButton />
        </div>
        {postcodeError && (
          <p className="mt-2 text-sm text-red-600">{postcodeError}</p>
        )}
      </form>

      {message && <p className="mt-3 text-sm text-red-600">{message}</p>}

      <AnimatePresence>
        {hasSearched && addresses.length > 0 && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <AddressDropdown
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedAddress && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-4"
          >
            <SelectedAddressDisplay
              selectedAddress={selectedAddress}
              onProceed={handleFindAgreements}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PostcodeForm;
