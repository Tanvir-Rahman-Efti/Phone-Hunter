import React, { useEffect } from 'react';

const Notification = ({ message, isVisible, setIsVisible }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, setIsVisible]);

  if (!isVisible) return null;

  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;