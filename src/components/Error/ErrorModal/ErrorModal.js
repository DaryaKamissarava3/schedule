import React, { useEffect, useState } from 'react';

import './style.css';

export const ErrorModal = ({ error }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const errorTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => {
      clearTimeout(errorTimer);
    };
  }, []);

  return (
    <div className={`error-modal ${isVisible ? 'visible' : 'hidden'}`}>
      <p>{error}</p>
    </div>
  );
};
