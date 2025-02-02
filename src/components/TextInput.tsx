import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface TextInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  validate?: (value: string) => boolean;
  icon?: ReactNode;
  maxLength?: number;
  className?: string;
  validateOnBlur?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  setValue,
  placeholder,
  validate,
  icon,
  maxLength = 255,
  className = "",
  validateOnBlur = true,
}) => {
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
    if (validate && validateOnBlur) {
      setIsValid(validate(value));
    }
  };

  return (
    <motion.div
      className={`relative flex-grow ${className}`}
      animate={touched && !isValid ? { x: [0, -5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.3 }}
    >
      {icon && (
        <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400">
          {icon}
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={maxLength}
        className={`w-full rounded-lg border py-3 pr-3 transition ${
          icon ? "pl-10" : "pl-3"
        } shadow-inner shadow-gray-400 focus:outline-none ${
          touched && !isValid
            ? "border-red-500 focus:border-red-500"
            : "border-gray-400 focus:border-blue-400"
        }`}
        placeholder={placeholder}
      />
    </motion.div>
  );
};

export default TextInput;
