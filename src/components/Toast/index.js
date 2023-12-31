import React from "react";

import { useForceUpdate } from "../../utils/useForceUpdate";
import './index.scss';

const toasts = [];
let index = 0;

export const useToast = () => {
  const forceUpdate = useForceUpdate();

  return ({
    show: (message, duration) => {
      toasts.push({ message, duration, id: index });
      forceUpdate();
      return index++;
    },
    hide: (id) => {
      const index = toasts.findIndex((toast) => toast.id === id);
      if (index !== -1) {
        toasts.splice(index, 1);
        forceUpdate();
        return true;
      }
      return false;
    }
  });
};
const ToastItem = ({ message, duration, id, handleToastHide }) => {
  React.useEffect(() => {
    setTimeout(() => handleToastHide(id), duration);
  }, [handleToastHide, id, duration]);

  return (
    <div className="toast-item">
      <div className="toast-item__message">{message}</div>
      <button onClick={() => handleToastHide(id)} className="toast-item__action">
        x
      </button>
    </div>
  );
};

const Toast = () => {
  const [messages,] = React.useState(toasts);
  const toast = useToast();
  const handleToastHide = (id) => {
    toast.hide(id);
  };

  return (
    <div className="toast-container">
      {messages.map((toast, index) => (
        <ToastItem key={index} {...toast} handleToastHide={handleToastHide} />
      ))}
    </div>
  );
};

export default Toast;
