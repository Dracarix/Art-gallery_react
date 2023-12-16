import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import cl from './DromDownInput.module.scss';
import { RootState } from '../../Theme';

export interface SelectsDownInput {
  neededInput: boolean;
  handleFromInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBeforeInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function DropInput({
  neededInput,
  handleBeforeInputChange,
  handleFromInputChange,
}: SelectsDownInput) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelectToggle = () => {
    setIsOpen(!isOpen);
  };

  const theme = useSelector((state: RootState) => state.theme);

  return (
    <div
      className={`custom-select ${isOpen ? 'open' : ''} ${cl.dropInput}`}
      role="button"
      tabIndex={0}
      onMouseDown={handleSelectToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSelectToggle();
        }
      }}
      style={isOpen ? { border: '2px solid' } : { border: '1px solid' }}
    >
      <div className={cl.selectHeader}>
        <div className={cl.placeholderDropInp}>Created</div>
        {isOpen ? (
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.321395 4.1663L4.22936 0.314613C4.65497 -0.104871 5.34503 -0.104871 5.77064 0.314613L9.67861 4.1663C10.3652 4.84298 9.87892 6 8.90797 6L1.09203 6C0.121082 6 -0.365172 4.84298 0.321395 4.1663Z"
              fill={theme === 'light' ? 'black' : 'white'}
              fillOpacity="0.3"
            />
          </svg>
        ) : (
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.36609e-08 1.09203 0L8.90797 6.7345e-07C9.87892 7.57111e-07 10.3652 1.15702 9.67861 1.8337Z"
              fill={theme === 'light' ? 'black' : 'white'}
              fillOpacity="0.3"
            />
          </svg>
        )}
      </div>
      {neededInput
        ? isOpen && (
        <div className={cl.additionalInputs}>
          <input
            type="text"
            placeholder="From"
            onMouseDown={(e) => e.stopPropagation()}
            onChange={handleFromInputChange}
          />
          <svg
            width="12"
            height="1"
            viewBox="0 0 12 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              y1="0.5"
              x2="12"
              y2="0.5"
              stroke={theme === 'light' ? 'black' : 'white'}
            />
          </svg>
          <input
            type="text"
            placeholder="before"
            onMouseDown={(e) => e.stopPropagation()}
            onChange={handleBeforeInputChange}
          />
        </div>
        )
        : isOpen && <div>{/* Ваш второй случай */}</div>}
    </div>
  );
}

export default DropInput;
