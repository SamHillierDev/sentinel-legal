import { FaCarSide } from "react-icons/fa";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative mb-4 w-full">
      <div
        className="absolute -top-6 transition-all duration-500 ease-in-out"
        style={{ left: `calc(${progress}% - 10px)` }}
      >
        <FaCarSide className="text-2xl text-[#C58F60]" />{" "}
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-[#C58F60] transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
