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

// Calcular el porcentaje global de hábitos
export const getGlobalPercentage = (habits: Habit[]): number => {
  const totalDays = habits.length * 7;
  const completedDays = habits.reduce((acc, habit) => {
    return acc + Object.values(habit.days).filter(Boolean).length;
  }, 0);
  return totalDays === 0 ? 0 : Math.round((completedDays / totalDays) * 100);
};

// Saber si hay algun dia completado
export const someDayCompleted = (habit: Habit): boolean => {
  return Object.values(habit.days).some(Boolean);
};

export const shouldShowCompletedBadge = (habit: Habit): boolean => {
  return isHabitWeekCompleted(habit);
};
