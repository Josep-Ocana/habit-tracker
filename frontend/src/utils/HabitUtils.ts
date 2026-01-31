import type { HabitDays } from "../types";

export const emptyDays = (): HabitDays => ({
  Lu: false,
  Ma: false,
  Mi: false,
  Ju: false,
  Vi: false,
  Sa: false,
  Do: false,
});
