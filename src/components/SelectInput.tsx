import { FaChevronDown } from "react-icons/fa";

interface SelectInputProps {
  options: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  selectedValue,
  setSelectedValue,
  placeholder = "Select an option",
}) => {
  return (
    <div className="relative mt-4">
      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-400 bg-white p-3 pr-10 shadow-inner shadow-gray-400 focus:border-blue-400 focus:ring-0 focus:outline-none"
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FaChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default SelectInput;
