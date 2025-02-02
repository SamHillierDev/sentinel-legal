import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import { validatePostcode } from "../utils/inputValidation";

const fetchAddresses = async (postcode: string) => {
  if (!postcode || !validatePostcode(postcode)) {
    throw new Error("Invalid postcode format.");
  }

  const response = await fetch(`${API_URL}${postcode}`);
  const data = await response.json();

  if (data.status !== 200 || !data.result) {
    throw new Error("No addresses found for this postcode.");
  }

  return [
    `${data.result.parliamentary_constituency}, ${data.result.region}, ${data.result.admin_district}`,
  ];
};

export const useFetchPostcode = (postcode: string) => {
  const [isValidPostcode, setIsValidPostcode] = useState(true);
  const [message, setMessage] = useState("");

  const {
    data: addresses,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["postcode", postcode],
    queryFn: () => fetchAddresses(postcode),
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (error) {
      setMessage(error.message);
    }
  }, [error]);

  const searchPostcode = () => {
    if (!postcode.trim()) {
      setMessage("Please enter a postcode.");
      setIsValidPostcode(false);
      return;
    }

    if (!validatePostcode(postcode)) {
      setMessage("The postcode you entered is invalid.");
      setIsValidPostcode(false);
      return;
    }

    setIsValidPostcode(true);
    setMessage("");
    refetch();
  };

  return {
    addresses: addresses || [],
    isValidPostcode,
    message,
    isLoading,
    searchPostcode,
    setMessage,
  };
};
