import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./TaskItem.module.css";
import { CheckIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const TaskItem = ({
  task,
  deleteTask,
  toggleTask,
  updateTaskDate,
  enterEditMode,
}) => {
  const [isChecked, setIsChecked] = useState(task.checked);
  const [taskDate, setTaskDate] = useState("");

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
    toggleTask(task.id);
  };

  return (
    <motion.li
      initial={{ y: "-50%", opacity: 0 }}
      className={`${styles.task} max-w-[100vw] flex-wrap`}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-50%", opacity: 0 }}
    >
      <div>
        <DatePicker
          onChange={(e) => {
            setTaskDate(e);
            updateTaskDate({ ...task, date: e });
          }}
          value={taskDate || task.date}
        />
        <div className={`${styles["task-group"]}`}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isChecked}
            onChange={handleCheckboxChange}
            name={task.name}
            id={task.id}
          />
          <label htmlFor={task.id} className={`${styles.label} text-pretty`}>
            {task.name}
            <p className={styles.checkmark}>
              <CheckIcon strokeWidth={2} width={24} height={24} />
            </p>
          </label>
        </div>
      </div>
      <div className={`${styles["task-group"]} grow justify-end`}>
        <button
          className="btn self-end"
          aria-label={`Update ${task.name} Task`}
          onClick={() => enterEditMode(task)}
        >
          <PencilSquareIcon width={24} height={24} />
        </button>

        <button
          className={`btn ${styles.delete} self-end`}
          aria-label={`Delete ${task.name} Task`}
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon width={24} height={24} />
        </button>
      </div>
    </motion.li>
  );
};
export default TaskItem;
