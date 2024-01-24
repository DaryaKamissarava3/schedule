import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div>
        Copyright © 2024 | Все права защищены, Поддержка веб-сервиса
        <Link to="https://cit.vstu.by/" className="footer-link">
          cit.vstu.by
        </Link>
      </div>
    </footer>
  );
};
