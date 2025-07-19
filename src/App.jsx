import { CheckIcon, PencilLineIcon, PlusIcon } from "@phosphor-icons/react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("minhasTarefas");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("minhasTarefas", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    setTasks((prevTasks) => [...prevTasks, inputValue]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md md:max-w-xl shadow-lg shadow-gray-300 rounded-xl p-6 flex flex-col gap-4 items-center bg-white">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-gray-700 text-2xl md:text-3xl font-bold">Lista de Tarefas</h1>
          <h3 className="text-sm md:text-base mt-1">Total: {tasks.length} tarefas</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full items-center justify-center">
          <input
            type="text"
            placeholder="Digite o título da tarefa"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="shadow-lg w-full sm:w-[250px] h-[50px] rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
          />

          <button
            onClick={handleAddTask}
            className={`flex items-center justify-center w-full sm:w-[120px] h-[40px] gap-1 text-white transition-colors duration-300 font-medium rounded-md 
              ${
                inputValue
                  ? "bg-blue-900 hover:bg-blue-800 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!inputValue.trim()}
          >
            <PlusIcon size={18} />
            Adicionar
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="text-gray-500 text-xl md:text-2xl mt-8 flex flex-col justify-center items-center text-center">
            <h3>Sem tarefas ainda. Adicione uma nova!</h3>
            <div className="flex justify-center items-center mt-2">
              <PencilLineIcon size={60} />
            </div>
          </div>
        ) : (
          <div className="w-full mt-4 space-y-3">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="shadow-md w-full h-[50px] rounded border border-gray-200 flex items-center gap-2 px-3"
              >
                <CheckIcon size={25} />
                <h2 className="text-base md:text-lg">{task}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
