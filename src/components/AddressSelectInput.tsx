import SelectInput from "./SelectInput";

interface AddressSelectInputProps {
  addresses: string[];
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
}

const AddressSelectInput: React.FC<AddressSelectInputProps> = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
}) => {
  return addresses.length > 0 ? (
    <SelectInput
      options={addresses}
      selectedValue={selectedAddress}
      setSelectedValue={setSelectedAddress}
      placeholder="Select an address"
    />
  ) : null;
};

export default AddressSelectInput;
