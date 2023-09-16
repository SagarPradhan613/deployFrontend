import React, { useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";
import TaskStatusFilter from "./TaskStatusFilter";
import "./TaskManager.css";
import { useDispatch, useSelector } from "react-redux";

const TaskManager = () => {
  // Fetch tasks using the custom hook
  const { tasks, add, update, remove, fetch } = useTasks();

  // State for filter, title, description, and modal
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the theme from Redux state
  const theme = useSelector((state) => state.theme);

  // Determine the CSS class based on the theme
  const classname = theme === "light" ? "light" : "dark";

  // Use useEffect to change the body background color based on the theme
  useEffect(() => {
    if (classname === "dark") {
      document.body.style.backgroundColor = "#00060e";
    } else {
      document.body.style.backgroundColor = "rgba(234, 171, 231, 0.4)";
    }
  }, [classname]);

  // Use useEffect to fetch tasks when the filter changes
  useEffect(() => {
    fetch(filter);
  }, [filter]);

  // Close the modal and reset input fields
  const handleCloseModal = () => {
    setTitle("");
    setDescription("");
    setIsModalOpen(false);
  };

  // Add a new task
  const handleAddTask = () => {
    if (title && description) {
      const newTask = {
        title: title,
        description: description,
      };
      add(newTask.title, newTask.description);
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
    }
  };

  // Update task status
  const handleUpdateTask = (taskId, newStatus) => {
    update(taskId, newStatus);
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    remove(taskId);
  };

  return (
    <div className="main-body">
      {/* Modal for adding tasks */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className={`modal-content ${classname}`}>
            <div className="modal-header">
              <button
                type="button"
                className={`btn-close ${classname}`}
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <input
                className="modal-inputs"
                value={title}
                placeholder="task name"
                onChange={(e) => setTitle(e.target.value)}
                maxLength={30}
              ></input>
              <input
                className="modal-inputs"
                value={description}
                placeholder="task description"
                onChange={(e) => setDescription(e.target.value)}
                maxLength={50}
              ></input>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className={`modalBox ${classname}`}
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className={`modalBox ${classname}`}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={handleAddTask}
              >
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Button to open the modal */}
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className={`addBtn ${classname}`}
      >
        <i className="uil uil-plus"></i>
      </button>
      {/* Filter component */}
      <TaskStatusFilter filter={filter} setFilter={setFilter}></TaskStatusFilter>
      {/* List of tasks */}
      <div className={`taskList-container ${classname}`}>
        {tasks.map((task) => (
          <div className={`task-container ${classname}`} key={task.id}>
            <div className="taskDelete-container">
              <button
                className={`taskDelete ${classname}`}
                onClick={() => handleDeleteTask(task.id)}
              >
                <i className="uil uil-trash"></i>
              </button>
            </div>
            <p className="taskTitle">{task.title}</p>
            <p className="taskDescription">{task.description}</p>
            <p className="taskDescription">status: {task.status}</p>
            <div className="taskButton-container">
              <button
                className={`taskButton ${classname}`}
                onClick={() => handleUpdateTask(task.id, "completed")}
              >
                Mark as Completed
              </button>
              <button
                className={`taskButton ${classname}`}
                onClick={() => handleUpdateTask(task.id, "pending")}
              >
                Mark as Pending
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
