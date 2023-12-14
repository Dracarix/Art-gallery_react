import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import cl from './ThisButton.module.scss';

interface ThisButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function ThisButton({ children, ...props }: ThisButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={cl.btns}
      type="button"
    >
      {children}
    </button>
  );
}

export default ThisButton;
