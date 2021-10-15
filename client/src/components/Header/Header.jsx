import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = ({ links, toggle, handleClick, handleChange }) => {
  return (
    <Container>
      <Nav>
        <Hamburger>
          <input
            type="checkbox"
            id="checkbox"
            checked={toggle}
            onChange={handleChange}
          />
          <span></span>
          <span></span>
          <span></span>
          <Manu htmlFor="checkbox">
            <ul onClick={handleClick}>
              {links.map((el, idx) => (
                <Link to={el.path} key={idx}>
                  <li>{el.name}</li>
                </Link>
              ))}
            </ul>
          </Manu>
        </Hamburger>
      </Nav>
      <div>
        <Link to="/">MEGA COFFEE</Link>
      </div>
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  /* transition: font-size 0.5s ease-in; */
  background: ${({ theme }) => `${theme.magacoffeColor}`};
  color: ${({ theme }) => `${theme.whiteColor}`};

  & > div {
    padding: 1rem;
  }

  @media ${({ theme }) => theme.tabletS} {
    font-size: 2rem;
    justify-content: flex-end;
  }

  @media ${({ theme }) => theme.mobile} {
    /* font-size: 1.5rem; */
    & > div {
      padding: 1.5rem;
    }
  }
`;

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
    background: ${({ theme }) => theme.whiteColor};
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

      @media ${({ theme }) => theme.mobile} {
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
  background-color: rgba(30, 39, 46, 0.5);
  transition: opacity 1s cubic-bezier(0.77, 0.2, 0.05, 1);
  & > ul {
    position: absolute;
    width: 15rem;
    padding: 2.5rem;
    padding-top: 6.25rem;
    height: 100vh;
    background: ${({ theme }) => theme.magacoffeColor};
    font-size: 1.5rem;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    transform-origin: 0% 0%;
    transform: translate(-100%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

    @media ${({ theme }) => theme.mobile} {
      width: 15rem;
    }

    & > a {
      color: #232323;
      transition: color 0.3s ease;

      &:hover {
        color: tomato;
      }
      & > li {
        padding: 10px 0;
        font-size: 1rem;
      }
    }
  }
`;

export default Header;
