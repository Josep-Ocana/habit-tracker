import { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

export function useHabits() {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error("useHabitContext debe usarse dentro de HabitProvider");
  }
  return context;
}
