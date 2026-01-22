import { getProgressBarColor } from "../habits/habits.ui";

type HabitProgressProps = {
  percentage: number;
};

const HabitProgress = ({ percentage }: HabitProgressProps) => {
  return (
    <>
      <div className="w-60 bg-gray-300 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${getProgressBarColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {/* %*/}
      <span className="relative font-semibold w-10 text-right mr-3">
        {percentage}%
      </span>
    </>
  );
};

export default HabitProgress;
