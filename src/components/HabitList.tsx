import { useHabits } from "../hooks/useHabits";
import type { HabitDays } from "../types";

const HabitList = () => {
  const { state, dispatch } = useHabits();

  return (
    <>
      <div className="mx-auto p-3">
        {state.habits.length <= 0 ? (
          <h2 className="text-2xl text-center">
            Añade un <span className="text-blue-900 font-bold">Hábito</span>
          </h2>
        ) : (
          <>
            <h2 className="text-2xl text-center mb-5">Habits List</h2>
            <div>
              {state.habits.map((habit) => {
                const completedDays = Object.values(habit.days).filter(
                  Boolean
                ).length;
                const percentage = Math.round((completedDays / 7) * 100);

                return (
                  <div
                    className="flex justify-between items-center bg-white w-full p-3 mb-3 rounded-lg shadow-lg"
                    key={habit.id}
                  >
                    <p className="font-semibold text-gray-800">{habit.name}</p>
                    <p className="ml-auto">
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
                    </p>
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
