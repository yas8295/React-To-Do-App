import TaskItem from "./TaskItem";
import { motion } from "framer-motion";
import styles from "./TaskList.module.css";

const TaskList = ({
  tasks,
  filter,
  sort,
  deleteTask,
  toggleTask,
  updateTaskDate,
  enterEditMode,
}) => {
  if (tasks.length === 0) {
    return (
      <motion.h1
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        No Tasks Yet
      </motion.h1>
    );
  }

  return (
    <>
      <motion.h1
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ textTransform: "capitalize" }}
      >
        {filter}
      </motion.h1>
      <ul className={styles.tasks}>
        {tasks
          .sort((a, b) =>
            sort
              ? new Date(a.date) - new Date(b.date)
              : new Date(b.date) - new Date(a.date)
          )
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              enterEditMode={enterEditMode}
              updateTaskDate={updateTaskDate}
            />
          ))}
      </ul>
    </>
  );
};
export default TaskList;
