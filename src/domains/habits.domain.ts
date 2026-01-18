import type { Habit } from "../types";

// Calcular los dias que tienen el hábito completado
export const getCompletedDays = (habit: Habit): number => {
  return Object.values(habit.days).filter(Boolean).length;
};

// Calcular el porcentage semanal del Hábito
export const getHabitPercentage = (habit: Habit): number => {
  return Math.round((getCompletedDays(habit) / 7) * 100);
};

// Calcular si el hábito tiene la semana completada
export const isHabitWeekCompleted = (habit: Habit): boolean => {
  return Object.values(habit.days).every(Boolean);
};
