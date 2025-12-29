import { type Habit, type HabitDays } from "../types";

export type State = {
  habits: Habit[];
};

export const initialState: State = {
  habits: [],
};

export type Action =
  | { type: "ADD_HABIT"; payload: Habit }
  | {
      type: "TOGGLE_DAY";
      payload: { habitId: Habit["id"]; day: keyof HabitDays };
    }
  | { type: "RESET_WEEK" };

export function habitReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_HABIT":
      return {
        ...state,
        habits: [...state.habits, action.payload],
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
      const newDays: HabitDays = {
        Lu: false,
        Ma: false,
        Mi: false,
        Ju: false,
        Vi: false,
        Sa: false,
        Do: false,
      };
      return {
        ...state,
        habits: state.habits.map((habit) => ({
          ...habit,
          days: newDays,
        })),
      };
    default:
      return state;
  }
}
