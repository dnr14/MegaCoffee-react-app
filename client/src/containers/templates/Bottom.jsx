import styled from 'styled-components';

import logo from '@/assets/images/topLogo.png';

const Bottom = () => {
  return (
    <Footer>
      <div>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <span>공부를 하기위해 개인적으로 만들어본 사이트입니다.</span>
      </div>
    </Footer>
  );
};

const Footer = styled.footer`
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.magacoffeColor2};
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    gap: 1rem;

    ${({ theme }) => theme.media.tab} {
      font-size: 0.7rem;
    }
    ${({ theme }) => theme.media.mobile} {
      font-size: 0.5rem;
    }
  }

  & > div > div {
    width: 30%;
    max-width: 400px;
    ${({ theme }) => theme.media.mobile} {
      width: 60%;
    }
  }

  img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
`;

export default Bottom;
