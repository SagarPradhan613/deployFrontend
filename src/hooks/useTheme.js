import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/actions/themeActions";

const useTheme = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleTheme());
  };

  return { theme, toggle };
};

export default useTheme;
