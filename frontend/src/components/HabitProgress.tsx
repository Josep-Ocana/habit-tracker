import React from "react";
import { getProgressBarColor, sizes } from "../habits/habits.ui";

type HabitProgressProps = {
  percentage: number;
  size?: "sm" | "md";
};

const HabitProgress = ({ percentage, size = "sm" }: HabitProgressProps) => {
  const classSize = sizes[size];
  return (
    <>
      <div
        className={`bg-gray-300 rounded-full overflow-hidden ${classSize}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
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

export default React.memo(HabitProgress);
