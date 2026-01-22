type HabitBadgeProps = {
  isWeekCompleted: boolean;
};

const HabitBadge = ({ isWeekCompleted }: HabitBadgeProps) => {
  if (!isWeekCompleted) return null;

  return (
    <span
      className="
              sm:absolute top-6 
              inline-block whitespace-nowrap
              text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full
              transition-all duration-300 ease-out
              animate-badge
              sm:[animation-delay:75ms]
              "
    >
      Semana completada
    </span>
  );
};

export default HabitBadge;
