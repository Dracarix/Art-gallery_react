import React from 'react';
import classes from './selects.module.scss';

export interface SelectsProps {
  options: Array<{ value: number; name: string }>;
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
}

function Selects({
  options, defaultValue, value, onChange,
}: SelectsProps) {
  return (
    <select
      className={classes.selectsFliter}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      title={defaultValue}
    >
      <option hidden value={defaultValue}>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          className={classes.optionfilter}
          value={option.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default Selects;
