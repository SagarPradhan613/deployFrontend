import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { toggleTheme } from "../redux/actions/themeActions";

const Header = () => {
  const theme = useSelector((state) => state.theme);
  console.log(theme);
  const dispatch = useDispatch();
  const classname = theme === "light" ? "light" : "dark";

  return (
    <>
      <nav class={`navbar mode-${classname}`}>
        <div class="container-fluid">
          <span id={classname} class="navbar-brand mb-0 h1">
            Mr Sagar's Taskbar
          </span>

          <button
            onClick={() => dispatch(toggleTheme())}
            type="button"
            class={`btn btn-light`}
          >
            Toggle Theme
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
