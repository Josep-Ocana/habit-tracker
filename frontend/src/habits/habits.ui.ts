export const getProgressBarColor = (percentage: number) => {
  if (percentage < 40) return "bg-red-500";
  if (percentage < 70) return "bg-yellow-500";
  return "bg-green-500";
};

export const sizes = {
  sm: "h-3 w-60",
  md: "h-4 w-full",
};
