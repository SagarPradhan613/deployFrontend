// Import necessary modules and libraries
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import taskReducer from "../reducers/taskReducer";
import axios from "axios";
import { toast } from "react-toastify";

// Helper function to display error messages using Toast
const notifyError = (error) => {
  toast.error(error.message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

// Helper function to display success messages using Toast
const notifySuccess = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

// Configuration for Redux Persist
const taskPersistConfig = {
  key: "task",
  storage,
  blacklist: [],
};

// API URL for tasks
// const API_URL = "http://192.168.1.4:3000/api/tasks";
const API_URL = "https://deploybackend-two.vercel.app/api/tasks";

// Action to fetch tasks based on a filter
export const fetchTasks = (filter) => async (dispatch) => {
  try {
    // Fetch tasks from the API based on the provided filter
    const response = await axios.get(`${API_URL}?filter=${filter}`);
    // Dispatch a success action with the fetched data
    dispatch({ type: "FETCH_TASKS_SUCCESS", payload: response.data });
  } catch (error) {
    // Dispatch a failure action with the error and show an error notification
    dispatch({ type: "FETCH_TASKS_FAILURE", payload: error });
    notifyError(error);
  }
};

// Action to add a new task
export const addTask = (newTask) => async (dispatch) => {
  try {
    // Send a POST request to add a new task
    const response = await axios.post(API_URL, newTask);
    // Dispatch a success action with the added task and show a success notification
    dispatch({ type: "ADD_TASK", payload: response.data });
    notifySuccess("Task Added Successfully");
  } catch (error) {
    // Dispatch a failure action with the error and show an error notification
    dispatch({ type: "ADD_TASK_FAILURE", payload: error });
    notifyError(error);
  }
};

// Action to update the status of a task
export const updateTask = (taskId, status) => async (dispatch) => {
  try {
    // Send a PUT request to update the task status
    const response = await axios.put(`${API_URL}/${taskId}`, { status });
    // Dispatch a success action with the updated task and show a success notification
    dispatch({ type: "UPDATE_TASK", payload: response.data });
    notifySuccess("Task Updated Successfully");
  } catch (error) {
    // Dispatch a failure action with the error and show an error notification
    dispatch({ type: "UPDATE_TASK_FAILURE", payload: error });
    notifyError(error);
  }
};

// Action to delete a task
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    // Send a DELETE request to delete a task
    await axios.delete(`${API_URL}/${taskId}`);
    // Dispatch an action to remove the task from the state and show a success notification
    dispatch({ type: "DELETE_TASK", payload: taskId });
    notifySuccess("Task Deleted Successfully");
  } catch (error) {
    // Dispatch a failure action with the error and show an error notification
    dispatch({ type: "DELETE_TASK_FAILURE", payload: error });
    notifyError(error);
  }
};

// Export the default reducer with Redux Persist configuration
export default persistReducer(taskPersistConfig, taskReducer);
