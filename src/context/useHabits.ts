import { useContext } from "react";
import { HabitContext } from "./HabitContext";

export function useTodos() {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error("useHabitContext debe usarse dentro de HabitProvider");
  }
  return context;
}
