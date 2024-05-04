import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import CustomForm from "./components/CustomForm";
import EditForm from "./components/EditForm";
import TaskList from "./components/TaskList";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const [sort, setSort] = useState(true);
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useLocalStorage("react-todo.tasks", []);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const updateTask = (task) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
    closeEditMode();
  };

  const updateTaskDate = (task) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, date: task.date } : t))
    );
  };

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  };

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  };

  return (
    <div className="pt-10 px-3 flex flex-col justify-center items-center gap-3">
      <header>
        <h1>My Task List</h1>
      </header>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={() => setFilter("all")}
          className="btn"
          style={{ width: "60px", maxWidth: "none", justifyContent: "center" }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="btn"
          style={{ width: "120px", maxWidth: "none", justifyContent: "center" }}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("active")}
          className="btn"
          style={{ width: "120px", maxWidth: "none", justifyContent: "center" }}
        >
          Active
        </button>
        <button
          onClick={() => setSort(!sort)}
          className="btn"
          style={{ width: "120px", maxWidth: "none", justifyContent: "center" }}
        >
          Sort by date {sort ? "↑" : "↓"}
        </button>
      </div>
      {isEditing && (
        <EditForm
          editedTask={editedTask}
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
      )}
      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList
          tasks={tasks.filter((task) =>
            filter === "all"
              ? task
              : filter === "completed"
              ? task.checked === true
              : task.checked === false
          )}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
          updateTaskDate={updateTaskDate}
          filter={filter}
          sort={sort}
        />
      )}

      <ThemeSwitcher />
    </div>
  );
}

export default App;
