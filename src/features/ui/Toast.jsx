import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultOptions = {
  limit: 3,
  position: "top-right",
  autoClose: 50000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
};
function notifySuccess(message, options = { defaultOptions }) {
  toast.success(message, options);
}
function notifyError(message, options = { defaultOptions }) {
  toast.error(message, options);
}

import PropTypes from "prop-types";

function Toast({
  limit = 3,
  position = "top-right",
  autoClose = 100000,
  hideProgressBar = false,
  newestOnTop = true,
  closeOnClick = true,
  rtl = false,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
  theme = "light",
}) {
  return (
    <ToastContainer>
      limit={limit}
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick={closeOnClick}
      rtl={rtl}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      theme={theme}
    </ToastContainer>
  );
}

Toast.propTypes = {
  limit: PropTypes.number,
  position: PropTypes.string,
  autoClose: PropTypes.number,
  hideProgressBar: PropTypes.bool,
  newestOnTop: PropTypes.bool,
  closeOnClick: PropTypes.bool,
  rtl: PropTypes.bool,
  pauseOnFocusLoss: PropTypes.bool,
  draggable: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  theme: PropTypes.string,
};
export { notifySuccess, notifyError };
export default Toast;
