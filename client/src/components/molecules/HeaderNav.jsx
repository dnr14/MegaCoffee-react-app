import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderNav = ({
  toggle,
  handleChange,
  handleClick,
  links,
  isLogin,
  children,
}) => {
  return (
    <Nav>
      <Hamburger>
        <input
          type="checkbox"
          id="checkbox"
          checked={toggle}
          onChange={handleChange}
        />
        <span />
        <span />
        <span />
        <Manu htmlFor="checkbox">
          <ul onClick={handleClick}>
            {isLogin && <StyledLi>{children}</StyledLi>}
            {links.map((el, idx) => (
              <li key={idx}>
                <NavLink to={el.path} activeClassName="active" exact>
                  {el.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </Manu>
      </Hamburger>
    </Nav>
  );
};

const Hamburger = styled.div`
  position: relative;
  margin: auto;
  z-index: 1;
  width: 1.65rem;
  -webkit-user-select: none;
  user-select: none;

  & > span {
    display: block;
    width: 100%;
    height: 0.2rem;
    margin-bottom: 0.4rem;
    position: relative;
    background: ${({ theme }) => theme.color.white1};
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0px;
    transition-property: transform, background, opacity;
    transition-duration: 0.5s, 0.5s, 0.55s;
    transition-timing-function: cubic-bezier(0.77, 0.2, 0.05, 1),
      cubic-bezier(0.77, 0.2, 0.05, 1), ease;
    &:nth-child(3) {
      transform-origin: 0% 0%;
      transform: translateX(0);
    }
    &:nth-child(4) {
      transform-origin: 0% 100%;
    }
  }

  & > input {
    display: block;
    width: 100%;
    height: 100%;
    height: 1.25rem;
    position: absolute;
    cursor: pointer;
    margin: 0;
    opacity: 0;
    z-index: 2;

    &:checked ~ span {
      opacity: 1;
      transform: rotate(45deg) translate(3px, -0.5px);
      background: #232323;
      &:nth-child(3) {
        opacity: 0;
        transform: translateX(100%);
      }
      &:nth-child(4) {
        transform: rotate(-45deg) translate(4px, 0.5px);
      }

      ${({ theme }) => theme.media.mobile} {
        transform: rotate(45deg) translate(2px, -1px);
        &:nth-child(4) {
          transform: rotate(-45deg) translate(4px, 0px);
        }
      }
    }
    &:checked ~ label > ul {
      transform: none;
    }
    &:checked ~ label {
      opacity: 1;
      right: 0;
      transform: none;
    }
  }
`;
const Nav = styled.nav`
  position: absolute;
  display: flex;
  left: 1rem;
  top: 0;
  bottom: 0;
`;
const Manu = styled.label`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  margin: 0;
  opacity: 0;
  background: ${({ theme }) => theme.color.shadowColor};
  transition: opacity 1s cubic-bezier(0.77, 0.2, 0.05, 1);
  .active {
    color: ${({ theme }) => theme.color.white1};
  }

  & > ul {
    position: absolute;
    box-sizing: border-box;
    width: 20rem;
    padding: 6.25rem 2.5rem 0 2.5rem;
    height: 100vh;
    background: ${({ theme }) => theme.color.magacoffeColor};
    font-size: 1.5rem;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    transform-origin: 0% 0%;
    transform: translate(-100%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

    ${({ theme }) => theme.media.mobile} {
      width: 100vw;
      padding: 6.25rem 1rem 0 1rem;
    }

    & > li {
      font-size: 1rem;
      margin-bottom: 1rem;
      & > a {
        color: #232323;
        transition: color 0.3s ease;

        &:hover {
          color: ${({ theme }) => theme.color.white1};
        }
      }
    }
  }
`;
const StyledLi = styled.li`
  position: relative;
  display: none;
  height: 100px;
  padding: 0;

  & > div {
    width: 100%;
    margin: 0;
  }

  & > div > div > div:last-child {
    padding-top: 0.6rem;
  }

  ${({ theme }) => theme.media.tab} {
    display: block;

    & > div {
      height: 100%;
      display: flex;
    }
  }
  ${({ theme }) => theme.media.mobile} {
    height: 5rem;
  }
`;

export default HeaderNav;
