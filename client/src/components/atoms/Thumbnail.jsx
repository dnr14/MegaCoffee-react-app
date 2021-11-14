import styled from 'styled-components';

const Thumbnail = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  background: ${({ theme }) => theme.color.backgroundColor1};
  box-shadow: ${({ theme }) => theme.boxShadow1};

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    z-index: -1;
  }
  img {
    height: 100%;
    width: 100%;
  }
  label {
    position: relative;
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    margin-top: 1rem;
    padding: 0.25rem 2rem;
    background: ${({ theme }) => theme.color.white1};
    color: ${({ theme }) => theme.color.magacoffeColor1};
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 2%) 0px 0px 4px;
    font-size: 1rem;
    line-height: 1.5;
    outline: none;
    border: none;
    transition: all 0.125s ease-in 0s;
  }
  span {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    outline: none;
    border: none;
    font-size: 1rem;
    color: rgb(134, 142, 150);
    cursor: pointer;
    padding: 1rem;
    text-decoration: underline;
  }

  @media screen and (max-width: 650px) {
    width: 300px;
    height: 300px;
  }

  @media screen and (max-width: 300px) {
    width: 200px;
    height: 200px;
  }
`;

export default Thumbnail;
