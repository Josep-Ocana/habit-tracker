export type Habit = {
  id: string;
  name: string;
  days: HabitDays;
};

export type HabitDays = {
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
};
