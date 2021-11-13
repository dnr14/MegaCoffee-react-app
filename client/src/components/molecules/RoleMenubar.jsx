import React from 'react';
import MenuBar from '../atoms/MenuBar';
import SelectBox from '../atoms/SelectBox';
import UlWrapper from '../atoms/UlWrapper';

const RoleMenubar = ({
  id,
  role,
  ROLE_EUNM,
  clickedId,
  isRoleModalOpen,
  setIsRoleModalOpen,
  handleAdminModalClick,
  handleUserRoleStateChange,
}) => {
  return (
    <div>
      <SelectBox onClick={handleAdminModalClick(id)}>
        {ROLE_EUNM[role]}
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
      {isRoleModalOpen && clickedId === id && (
        <MenuBar
          isOpen={isRoleModalOpen && clickedId === id}
          setIsOpen={setIsRoleModalOpen}
        >
          <UlWrapper onClick={handleUserRoleStateChange(role, id)}>
            {Object.keys(ROLE_EUNM).map(key => (
              <li
                key={key}
                id={`${key}`}
                className={key === role ? 'checked' : ''}
              >
                {ROLE_EUNM[key]}
              </li>
            ))}
          </UlWrapper>
        </MenuBar>
      )}
    </div>
  );
};

export default RoleMenubar;
