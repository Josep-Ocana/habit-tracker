export type Habit = {
  id: string;
  name: string;
  days: HabitDays;
};

export type HabitDays = {
  Lu: boolean;
  Ma: boolean;
  Mi: boolean;
  Ju: boolean;
  Vi: boolean;
  Sa: boolean;
  Do: boolean;
};
