import { useHabits } from "../hooks/useHabits";
import type { HabitDays } from "../types";

const HabitList = () => {
  const { state, dispatch } = useHabits();

  const hasAnyCompletedDay = state.habits.some((habit) =>
    Object.values(habit.days).some(Boolean)
  );

  return (
    <>
      <div className="flex flex-col mx-auto p-3">
        {state.habits.length <= 0 ? (
          <h2 className="text-2xl text-center">
            Añade un <span className="text-blue-900 font-bold">Hábito</span>
          </h2>
        ) : (
          <>
            <h2 className="text-2xl text-center mb-5">Habits List</h2>
            <button
              className={`bg-yellow-500 text-white p-2 rounded-lg mx-auto mb-5  ${
                hasAnyCompletedDay
                  ? "cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => {
                if (
                  hasAnyCompletedDay &&
                  window.confirm("Resetear toda la semana?")
                ) {
                  dispatch({ type: "RESET_WEEK" });
                }
              }}
            >
              Resetear Semana
            </button>
            <div>
              {state.habits.map((habit) => {
                const completedDays = Object.values(habit.days).filter(
                  Boolean
                ).length;
                const percentage = Math.round((completedDays / 7) * 100);

                return (
                  <div
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white w-full p-3 mb-3 rounded-lg shadow-lg"
                    key={habit.id}
                  >
                    <p className="font-semibold text-gray-800">{habit.name}</p>
                    <div className="ml-auto grid grid-cols-3 sm:grid-cols-7 gap-1">
                      {Object.entries(habit.days).map(([day, value]) => (
                        <button
                          className={`ms-1 px-2 py-1 text-xs rounded-md transition ${
                            value
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          onClick={() =>
                            dispatch({
                              type: "TOGGLE_DAY",
                              payload: {
                                habitId: habit.id,
                                day: day as keyof HabitDays,
                              },
                            })
                          }
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                    <p
                      className={`font-semibold w-10  text-right ${
                        percentage < 40
                          ? "text-red-500"
                          : percentage < 70
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {percentage}%
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="flex justify-between"></div>
      </div>
    </>
  );
};

export default HabitList;
