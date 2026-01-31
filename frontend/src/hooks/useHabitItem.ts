import { useState } from "react";
import type { Habit } from "../types";
import { useHabits } from "./useHabits";

export function useHabitItem(habit: Habit) {
  const { updateHabit, deleteHabit } = useHabits();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState<string>(habit.name);

  const startEditing = () => {
    setIsEditing(true);
  };

  const saveEditing = () => {
    updateHabit(habit.id, editName);
    setIsEditing(false);
    setEditName("");
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditName("");
  };

  const deleteCurrentHabit = () => {
    window.confirm("Eliminar hábito? ") && deleteHabit(habit.id);
  };

  return {
    isEditing,
    editName,
    setEditName,
    startEditing,
    cancelEditing,
    saveEditing,
    deleteCurrentHabit,
  };
}
