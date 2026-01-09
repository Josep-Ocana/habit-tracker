import { type Habit, type HabitDays } from "../types";
import { emptyDays } from "../utils/HabitUtils";

export type State = {
  habits: Habit[];
};

export const initialState: State = {
  habits: [],
};

export type Action =
  | { type: "ADD_HABIT"; payload: Habit }
  | { type: "UPDATE_HABIT"; payload: { habitId: Habit["id"]; name: string } }
  | {
      type: "TOGGLE_DAY";
      payload: { habitId: Habit["id"]; day: keyof HabitDays };
    }
  | { type: "DELETE_HABIT"; payload: Habit["id"] }
  | { type: "RESET_WEEK" };

export function habitReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_HABIT":
      return {
        ...state,
        habits: [...state.habits, action.payload],
      };

    case "UPDATE_HABIT":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.habitId
            ? {
                ...habit,
                name: action.payload.name,
              }
            : habit
        ),
      };

    case "DELETE_HABIT":
      return {
        ...state,
        habits: state.habits.filter((habit) => habit.id !== action.payload),
      };

    case "TOGGLE_DAY":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.habitId
            ? {
                ...habit,
                days: {
                  ...habit.days,
                  [action.payload.day]: !habit.days[action.payload.day],
                },
              }
            : habit
        ),
      };

    case "RESET_WEEK":
      return {
        ...state,
        habits: state.habits.map((habit) => ({
          ...habit,
          days: emptyDays(),
        })),
      };
    default:
      return state;
  }
}
