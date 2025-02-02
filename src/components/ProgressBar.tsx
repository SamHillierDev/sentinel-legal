interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full bg-[#C58F60] transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
