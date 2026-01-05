import { useMemo } from "react";
import { useHabits } from "../hooks/useHabits";
import type { HabitDays } from "../types";

const HabitList = () => {
  const { state, resetWeek, toggleDay } = useHabits();

  // Calcular progreso semanal
  const globalPercentage = useMemo(() => {
    const totalDays = state.habits.length * 7;
    const completedDays = state.habits.reduce((acc, habit) => {
      return acc + Object.values(habit.days).filter(Boolean).length;
    }, 0);
    return totalDays === 0 ? 0 : Math.round((completedDays / totalDays) * 100);
  }, [state.habits]);

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
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white p-4 rounded-lg shadow-lg mb-3">
              <p className="font-semibold shrink-0">
                Progreso Semanal: {globalPercentage} %
              </p>

              {/* Barra */}
              <div className="bg-gray-300 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    globalPercentage < 40
                      ? "bg-red-500"
                      : globalPercentage < 70
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${globalPercentage}%` }}
                ></div>
              </div>
            </div>

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
                  resetWeek();
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
                  // Carta
                  <div
                    className="bg-white w-full h-auto p-3 mb-3 rounded-lg shadow-lg"
                    key={habit.id}
                  >
                    {/* FILA SUPERIOR */}
                    <div className="flex items-center gap-3 mb-2">
                      {/* Nombre Hábito */}
                      <div className="max-w-150 overflow-x-auto scroll">
                        <p className="font-semibold text-gray-800 whitespace-nowrap ">
                          {habit.name}
                        </p>
                      </div>

                      {/* Barra */}
                      <div className="shrink-0 grow min-w-32 ml-auto ">
                        <div className="w-full bg-gray-300 rounded-full h-3 ml-auto overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              percentage < 40
                                ? "bg-red-500"
                                : percentage < 70
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* % */}
                      <span className="relative shrink-0 font-semibold w-10  text-right ">
                        {percentage}%
                        {percentage === 100 && (
                          <span className="absolute top-6 right-1 animate-pulse text-2xl ">
                            🔥
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Contenedor días semana */}
                    <div className="flex flex-wrap justify-center h-5 gap-2">
                      {(
                        Object.entries(habit.days) as [
                          keyof HabitDays,
                          boolean
                        ][]
                      ).map(([day, value]) => (
                        <button
                          className={` px-2 py-1 text-xs rounded-md transition shrink-0 ${
                            value
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          onClick={() => toggleDay(habit.id, day)}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
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
