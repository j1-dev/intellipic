'use-client';
import React, { useState } from 'react';

interface buttonProps {
  onClick: () => void;
  disabled: boolean;
  className: string;
  cooldownTime: number;
  children: React.ReactNode;
  // Add any other props you want to support
}

const Button: React.FC<buttonProps> = ({
  onClick,
  disabled,
  className,
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
    <button
      onClick={handleClick}
      className={className}
      disabled={isCooldown && disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
