import React from 'react';
import MenuBar from '../atoms/MenuBar';
import SelectBox from '../atoms/SelectBox';
import UlWrapper from '../atoms/UlWrapper';

const StateMenuBar = ({
  id,
  state,
  STATE_ENUM,
  clickedId,
  isStateModalOpen,
  setIsStateModalOpen,
  handleUserStateChange,
  handleStateModalClick,
}) => {
  return (
    <div>
      <SelectBox onClick={handleStateModalClick(id)}>
        {STATE_ENUM[state]}
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </SelectBox>
      {isStateModalOpen && clickedId === id && (
        <MenuBar
          isOpen={isStateModalOpen && clickedId === id}
          setIsOpen={setIsStateModalOpen}
        >
          <UlWrapper onClick={handleUserStateChange(state, id)}>
            {Object.keys(STATE_ENUM).map(key => (
              <li
                key={key}
                id={`${key}`}
                className={key === state ? 'checked' : ''}
              >
                {STATE_ENUM[key]}
              </li>
            ))}
          </UlWrapper>
        </MenuBar>
      )}
    </div>
  );
};

export default StateMenuBar;
