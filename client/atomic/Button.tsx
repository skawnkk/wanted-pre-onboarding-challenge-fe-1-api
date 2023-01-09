import React from 'react';

interface Button {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
function Button({ children, className = '', onClick = () => {} }: Button) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
