import { useState } from "react";
import { useHabits } from "../hooks/useHabits";

const AddHabitForm = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [alerta, setAlerta] = useState<string>("");

  const { dispatch, addHabit } = useHabits();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación
    if (inputValue.trim() === "") {
      setAlerta("campo vacío");
      return;
    }
    setAlerta("");
    addHabit(inputValue);
    setInputValue("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto bg-blue-300 w-full sm:w-2/3 shadow-lg rounded-lg p-3 space-y-3 mb-6"
      >
        {alerta !== "" && (
          <div className="bg-red-500 text-center text-white p-3 rounded-lg">
            {alerta}
          </div>
        )}
        <h3>Añade un nuevo Hábito</h3>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-white p-2 rounded"
        />
        <button className="bg-blue-900 p-2 rounded text-white uppercase w-full sm:w-1/3 mx-auto">
          Añadir
        </button>
      </form>
    </>
  );
};

export default AddHabitForm;
