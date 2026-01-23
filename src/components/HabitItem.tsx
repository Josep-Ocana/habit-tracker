import React from "react";
import {
  getHabitPercentage,
  shouldShowCompletedBadge,
} from "../habits/habits.domain";
import { useHabitItem } from "../hooks/useHabitItem";
import CancelIcon from "../icons/cancel.svg";
import DeleteIcon from "../icons/delete.svg";
import EditIcon from "../icons/edit.svg";
import SaveIcon from "../icons/save.svg";
import type { Habit, HabitDays } from "../types";
import HabitBadge from "./HabitBadge";
import HabitProgress from "./HabitProgress";

type HabitItemProps = {
  habit: Habit;
  toggleDay: (id: string, day: keyof HabitDays) => void;
};

function HabitItem({ habit, toggleDay }: HabitItemProps) {
  const {
    isEditing,
    editName,
    setEditName,
    startEditing,
    cancelEditing,
    saveEditing,
    deleteCurrentHabit,
  } = useHabitItem(habit);

  const percentage = getHabitPercentage(habit);
  const showCompletedBadge = shouldShowCompletedBadge(habit);

  return (
    <div className="bg-white w-full h-auto p-3 mb-3 rounded-lg shadow-lg">
      {/* FILA SUPERIOR ________________________________________________*/}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-2">
        {/* Nombre/edición Hábito + Badge */}
        <div className="relative flex gap-2 min-w-0">
          {isEditing ? (
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
            <p className="font-semibold text-gray-800 truncate">{habit.name}</p>
          )}

          <HabitBadge show={showCompletedBadge} />
        </div>

        {/* Barra */}
        <div className="flex items-center gap-2">
          <HabitProgress percentage={percentage} />

          {/* Botones*/}
          <div className="w-14 flex justify-end gap-1">
            {isEditing ? (
              <div className="flex shrink-0">
                <img
                  className="cursor-pointer"
                  aria-label="Botón Guardar hábito"
                  src={SaveIcon}
                  onClick={saveEditing}
                />
                <img
                  className="cursor-pointer"
                  aria-label="Boton Cancelar hábito"
                  src={CancelIcon}
                  onClick={cancelEditing}
                />
              </div>
            ) : (
              <div className="flex shrink-0">
                <img
                  className="cursor-pointer"
                  aria-label="Botón editar hábito"
                  src={EditIcon}
                  onClick={startEditing}
                />
                <img
                  className="cursor-pointer"
                  aria-label="Botón Eliminar hábito"
                  src={DeleteIcon}
                  onClick={deleteCurrentHabit}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Fila inferior */}
      <div className="flex flex-wrap justify-center gap-2 mt-2 ">
        {(Object.entries(habit.days) as [keyof HabitDays, boolean][]).map(
          ([day, value]) => (
            <button
              key={day}
              className={` px-2 py-1 text-xs rounded-md transition-all duration-200 transform hover:scale-105 shrink-0 ${
                value
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => toggleDay(habit.id, day)}
            >
              {day}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

export default React.memo(HabitItem, (prev, next) => {
  return prev.habit === next.habit;
});
