import React from "react";
import { useSelector } from "react-redux";

const TaskStatusFilter = ({ filter, setFilter }) => {
  const theme = useSelector((state) => state.theme);
  console.log(theme);
  const classname = theme === "light" ? "light" : "dark";

  return (
    <div className="filter-container">
      <button
        className={`filterButton ${classname}`}
        onClick={() => {
          setFilter("all");
        }}
      >
        All
      </button>
      <button
        className={`filterButton ${classname}`}
        onClick={() => {
          setFilter("completed");
        }}
      >
        Complete
      </button>
      <button
        className={`filterButton ${classname}`}
        onClick={() => {
          setFilter("pending");
        }}
      >
        Pending
      </button>
    </div>
  );
};

export default TaskStatusFilter;
