import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  updateTask,
  deleteTask,
  fetchTasks,
} from "../redux/actions/taskActions";

const useTasks = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const fetch = (filter) => {
    dispatch(fetchTasks(filter));
  };

  const add = (title, description) => {
    dispatch(addTask({ title, description }));
  };

  const update = (taskId, newStatus) => {
    dispatch(updateTask(taskId, newStatus));
  };

  const remove = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return { tasks, add, update, remove, fetch };
};

export default useTasks;
