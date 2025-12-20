import { createContext, useReducer } from "react";
import { habitReducer, initialState } from "./habitReducer";

// 1. TYPE
type HabitContextType = {
  state: State;
};

// 2. CONTEXT
export const HabitContext = createContext<HabitContextType | null>(null);

// 3. PROVIDER
export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(habitReducer, initialState);

  return (
    <HabitContext.Provider value={{ state }}>{children}</HabitContext.Provider>
  );
}
