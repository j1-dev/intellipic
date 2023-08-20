'use-client';
import React, { useState } from 'react';

interface buttonProps {
  onClick: () => void;
  cooldownTime: number;
  children: React.ReactNode;
  // Add any other props you want to support
}

const Button: React.FC<buttonProps> = ({
  onClick,
  cooldownTime,
  children,
  ...otherProps
}) => {
  const [isCooldown, setIsCooldown] = useState(false);

  const handleClick = () => {
    if (!isCooldown) {
      onClick();
      setIsCooldown(true);
      setTimeout(() => {
        setIsCooldown(false);
      }, cooldownTime);
    }
  };

  return (
    <button onClick={handleClick} disabled={isCooldown} {...otherProps}>
      {isCooldown ? 'Cooldown...' : children}
    </button>
  );
};

export default Button;
