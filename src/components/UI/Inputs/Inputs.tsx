import React, { ChangeEvent } from 'react';
import classes from './inputs.module.scss';

export interface ThisInput {
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function Inputs({
  placeholder, type, onChange, value,
}: ThisInput) {
  return (
    <input
      className={classes.filterInput}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export default Inputs;
