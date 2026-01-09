import { useMemo, useState } from "react";
import { useHabits } from "../hooks/useHabits";
import CancelIcon from "../icons/cancel.svg";
import DeleteIcon from "../icons/delete.svg";
import EditIcon from "../icons/edit.svg";
import SaveIcon from "../icons/save.svg";
import type { Habit, HabitDays } from "../types";

const HabitList = () => {
  const { state, resetWeek, toggleDay, updateHabit, deleteHabit } = useHabits();

  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");

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

  const startEditing = (id: Habit["id"], habitName: string) => {
    setEditingHabitId(id);
    setEditName(habitName);
  };

  const handleSave = (id: Habit["id"]) => {
    updateHabit(id, editName);
    setEditingHabitId(null);
    setEditName("");
  };

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

            {/* Progreso semanal
             */}
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

            {/* Lista de Hábitos */}
            <div>
              {state.habits.map((habit) => {
                const completedDays = Object.values(habit.days).filter(
                  Boolean
                ).length;
                const percentage = Math.round((completedDays / 7) * 100);

                return (
                  // Contenedor
                  <div
                    className="bg-white w-full h-auto p-3 mb-3 rounded-lg shadow-lg"
                    key={habit.id}
                  >
                    {/* FILA SUPERIOR */}
                    <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 mb-2 h-10">
                      {/* Nombre Hábito + edicion */}
                      <div className=" overflow-x-auto scroll">
                        {editingHabitId === habit.id ? (
                          <input
                            autoFocus
                            type="text"
                            className="w-full border rounded-lg pl-2"
                            aria-label="Editar hábito"
                            placeholder="Edita el hábito"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                        ) : (
                          <p className="relative font-semibold text-gray-800 truncate flex items-center gap-2">
                            {habit.name}
                            {percentage === 100 && (
                              <span className="animate-pulse text-xl ">🔥</span>
                            )}
                          </p>
                        )}
                      </div>

                      {/* Barra */}
                      <div className="shrink-0 w-24 sm:w-60 bg-gray-300 rounded-full h-3 overflow-hidden">
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

                      {/* % */}
                      <span className="relative font-semibold w-10 text-right mr-3">
                        {percentage}%
                      </span>

                      {/* Botones */}
                      <div className="w-14 flex justify-end  gap-1">
                        {editingHabitId === habit.id ? (
                          <div className="flex shrink-0 ">
                            <img
                              className="cursor-pointer"
                              aria-label="Botón Guardar hábito"
                              src={SaveIcon}
                              onClick={() => {
                                handleSave(habit.id);
                              }}
                            />
                            <img
                              className="cursor-pointer"
                              aria-label="Boton Cancelar hábito"
                              src={CancelIcon}
                              onClick={() => setEditingHabitId(null)}
                            />
                          </div>
                        ) : (
                          <>
                            <div className="flex shrink-0">
                              <img
                                className="cursor-pointer"
                                aria-label="Botón editar hábito"
                                src={EditIcon}
                                onClick={() => {
                                  startEditing(habit.id, habit.name);
                                }}
                              />
                              <img
                                className="cursor-pointer"
                                aria-label="Botón Eliminar hábito"
                                src={DeleteIcon}
                                onClick={() => {
                                  window.confirm("Eliminar hábito? ") &&
                                    deleteHabit(habit.id);
                                }}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Fila inferior */}
                    <div className="flex flex-wrap justify-center gap-2 mt-2 ">
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
