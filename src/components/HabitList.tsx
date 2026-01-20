import { useMemo } from "react";
import {
  getGlobalPercentage,
  someDayCompleted,
} from "../domains/habits.domain";
import { useHabits } from "../hooks/useHabits";

import HabitItem from "./HabitItem";

const HabitList = () => {
  const { state, resetWeek, toggleDay, updateHabit, deleteHabit } = useHabits();

  // Calcular progreso semanal
  const globalPercentage = useMemo(
    () => getGlobalPercentage(state.habits),
    [state.habits],
  );

  // Evaluar si en algun hábito hay algun dia completo
  const hasAnyCompletedDay = useMemo(
    () => state.habits.some(someDayCompleted),
    [state.habits],
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

            {/* Progreso semanal ____________________________________________________*/}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-lg mb-3">
              {/* Barra */}

              <p className="font-semibold shrink-0">Progreso Semanal:</p>
              <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
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
              <p className="font-semibold shrink-0">{globalPercentage} %</p>
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

            {/* Lista de Hábitos____________________________________________________*/}
            <div>
              {state.habits.map((habit) => {
                return (
                  <HabitItem
                    key={habit.id}
                    habit={habit}
                    toggleDay={toggleDay}
                    deleteHabit={deleteHabit}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HabitList;
