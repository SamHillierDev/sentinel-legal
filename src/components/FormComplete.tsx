import { FiCheckCircle } from "react-icons/fi";

interface FormCompleteProps {
  onReset: () => void;
}

const FormComplete: React.FC<FormCompleteProps> = ({ onReset }) => {
  return (
    <div className="text-center">
      <FiCheckCircle className="mx-auto text-6xl text-emerald-500" />
      <h2 className="mt-4 text-lg font-semibold text-gray-700">
        Thank you for submitting!
      </h2>
      <p className="text-sm text-gray-600">
        Your information has been successfully recorded.
      </p>
      <button
        onClick={onReset}
        className="mt-4 w-full cursor-pointer rounded-lg bg-gray-400 px-4 py-3 text-lg font-semibold text-white shadow-inner shadow-gray-300 transition hover:bg-gray-500"
      >
        Start New Form
      </button>
    </div>
  );
};

export default FormComplete;
