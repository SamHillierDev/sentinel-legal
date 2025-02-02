import { FaChevronDown } from "react-icons/fa";

interface AddressDropdownProps {
  addresses: string[];
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
}

const AddressDropdown: React.FC<AddressDropdownProps> = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
}) =>
  addresses.length > 0 ? (
    <div className="relative mt-4">
      <select
        id="address"
        value={selectedAddress}
        onChange={(e) => setSelectedAddress(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-400 bg-white p-3 pr-10 focus:border-blue-400 focus:ring focus:outline-none"
      >
        <option disabled value="">
          Select an address
        </option>
        {addresses.map((address, index) => (
          <option key={index} value={address}>
            {address}
          </option>
        ))}
      </select>
      <FaChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
    </div>
  ) : null;

export default AddressDropdown;
