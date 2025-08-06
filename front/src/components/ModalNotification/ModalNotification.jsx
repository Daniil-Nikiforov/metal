import React, { useEffect, useState } from "react";
import "./ModalNotification.css";

function ModalNotification({ message, type, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      const closeTimer = setTimeout(onClose, 300);
      return () => clearTimeout(closeTimer);
    }, 500);

    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div
      className={`notification ${type} ${isClosing ? "fade-out" : ""}`}
      style={{
        animation: isClosing
          ? "fadeOutNot 0.3s ease-out "
          : "slideIn 0.3s ease-out forwards",
      }}
    >
      <div className="notification-content">{message}</div>
    </div>
  );
}

export default ModalNotification;
