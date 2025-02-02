import { FiArrowRight } from "react-icons/fi";

interface SelectedAddressDisplayProps {
  selectedAddress: string;
  onProceed: () => void;
}

const SelectedAddressDisplay: React.FC<SelectedAddressDisplayProps> = ({
  selectedAddress,
  onProceed,
}) => {
  const handleFindAgreements = () => {
    if (!selectedAddress) return;
    onProceed();
  };

  return (
    <div
      className={`mt-4 transform transition-all duration-300 ease-in-out ${
        selectedAddress
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none -translate-y-3 scale-95 opacity-0"
      }`}
    >
      <div className="rounded-lg border-2 border-emerald-500 bg-emerald-50 p-4 text-gray-700 shadow-sm">
        <p className="text-sm font-medium">Selected Address:</p>
        <p className="text-lg font-semibold">{selectedAddress}</p>
      </div>

      <button
        onClick={handleFindAgreements}
        className={`mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-4 text-lg font-semibold text-nowrap text-white shadow-inner shadow-emerald-200 ring-offset-4 transition hover:bg-emerald-600 hover:ring-3 hover:ring-emerald-400`}
      >
        Find my agreements
        <FiArrowRight className="text-xl" />
      </button>
    </div>
  );
};

export default SelectedAddressDisplay;
