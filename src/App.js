import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import Header from './components/Header';
import TaskManager from './components/TaskManager';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Header />
          <TaskManager />
          <ToastContainer />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
