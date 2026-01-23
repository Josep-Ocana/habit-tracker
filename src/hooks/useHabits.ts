import { useCallback, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { HabitContext } from "../context/HabitContext";
import type { Habit, HabitDays } from "../types";

export function useHabits() {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error("useHabitContext debe usarse dentro de HabitProvider");
  }

  const { state, dispatch } = context;

  // Actions
  const addHabit = (name: string) => {
    const newHabit = {
      id: uuidv4(),
      name,
      days: {
        Lu: false,
        Ma: false,
        Mi: false,
        Ju: false,
        Vi: false,
        Sa: false,
        Do: false,
      },
    };
    dispatch({ type: "ADD_HABIT", payload: newHabit });
  };

  const updateHabit = (id: Habit["id"], name: string) => {
    const trimmed = name.trim();
    dispatch({ type: "UPDATE_HABIT", payload: { habitId: id, name: trimmed } });
  };

  const deleteHabit = (id: Habit["id"]) => {
    dispatch({ type: "DELETE_HABIT", payload: id });
  };

  const resetWeek = () => {
    dispatch({ type: "RESET_WEEK" });
  };

  const toggleDay = useCallback(
    (id: Habit["id"], day: keyof HabitDays) => {
      dispatch({ type: "TOGGLE_DAY", payload: { habitId: id, day } });
    },
    [dispatch],
  );

  return {
    addHabit,
    updateHabit,
    deleteHabit,
    resetWeek,
    toggleDay,
    state,
  };
}
