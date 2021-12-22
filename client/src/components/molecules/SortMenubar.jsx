import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { makeUrl } from '@/utils/urlUtil';
import MenuBar from '../atoms/MenuBar';
import SelectBox from '../atoms/SelectBox';

const SortMenubar = ({
  id,
  isOpen,
  SORT_EUNM,
  match,
  crrentQuery,
  setIsOpen,
  handleSortMenubarOpen,
  handleSortStateChange,
}) => {
  return (
    <div>
      <SelectBox onClick={handleSortMenubarOpen}>
        {SORT_EUNM[id]}
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
      {isOpen && (
        <MenuBar isOpen={isOpen} setIsOpen={setIsOpen}>
          <UlWrapper onClick={handleSortStateChange}>
            {Object.keys(SORT_EUNM).map(key => (
              <li
                key={key}
                className={crrentQuery.keyword === key ? 'checked' : ''}
              >
                <Link
                  to={makeUrl(match.path, crrentQuery, { keyword: key })}
                  id={`${key}`}
                >
                  {SORT_EUNM[key]}
                </Link>
              </li>
            ))}
          </UlWrapper>
        </MenuBar>
      )}
    </div>
  );
};

const UlWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    cursor: pointer;
    font-weight: 600;
    font-size: 0.875rem;
  }
  li + li {
    border-top: 1px solid rgb(241, 243, 245);
  }
  li:hover {
    background: rgb(248, 249, 250);
    color: ${({ theme }) => theme.color.magacoffeColor1};
  }
  a {
    display: block;
    padding: 0.75rem 1rem;
  }
`;

export default SortMenubar;
