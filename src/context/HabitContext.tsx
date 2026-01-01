import React, { createContext, useEffect, useReducer } from "react";
import {
  habitReducer,
  initialState,
  type Action,
  type State,
} from "./habitReducer";

//  CONSTANTS
const HABITS_STORAGE_KEY = "habits";

// TYPE
type HabitContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

// CONTEXT
export const HabitContext = createContext<HabitContextType | null>(null);

// Inicializador del reducer
const init = () => {
  const storeHabits = localStorage.getItem(HABITS_STORAGE_KEY);
  return {
    habits: storeHabits ? JSON.parse(storeHabits) : [],
  };
};

// PROVIDER
export function HabitProvider({ children }: { children: React.ReactNode }) {
  // useReducer con inicializador (init)
  const [state, dispatch] = useReducer(habitReducer, initialState, init);

  // Guardar cambios el localStorage
  useEffect(() => {
    localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(state.habits));
  }, [state.habits]);

  return (
    <HabitContext.Provider value={{ state, dispatch }}>
      {children}
    </HabitContext.Provider>
  );
}
