import React from 'react';
import styled from 'styled-components';

const Menus = () => {
  return (
    <FlexBox>
      <div>
        <Item>
          <img
            src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/menulink1.jpg"
            alt="links"
          />
          <div>브랜드 소개</div>
        </Item>
        <Item>
          <img
            src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/menulink2.jpg"
            alt="links"
          />
          <div>창업 안내</div>
        </Item>
        <Item>
          <img
            src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/menulink3.jpg"
            alt="links"
          />
          <div>인테리어</div>
        </Item>
        <Item>
          <img
            src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/menulink4.jpg"
            alt="links"
          />
          <div>전략</div>
        </Item>
        <Item>
          <img
            src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/menulink5.jpg"
            alt="links"
          />
          <div>매장찾기</div>
        </Item>
      </div>
      <div>
        <Item>
          <img
            src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/menulink6.jpg"
            alt="links"
          />
          <div>메뉴</div>
        </Item>
        <Item>
          <img
            src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/menulink7.jpg"
            alt="links"
          />
          <div>메가 이벤트</div>
        </Item>
        <Item>
          <img
            src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/menulink8.jpg"
            alt="links"
          />
          <div>블로그</div>
        </Item>
        <Item>
          <img
            src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/menulink9.jpg"
            alt="links"
          />
          <div>페이스북</div>
        </Item>
        <Item>
          <img
            src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/menulink10.jpg"
            alt="links"
          />
          <div>창업문의</div>
        </Item>
      </div>
    </FlexBox>
  );
};

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
  }
`;

const Item = styled.div`
  overflow: hidden;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    transition: transform 0.25s ease-in-out;
  }

  div {
    position: absolute;
    height: 3rem;
    padding-left: 1rem;
    bottom: 0;
    background-color: ${({ theme }) => theme.color.black1};
    left: 0;
    right: 0;
    color: ${({ theme }) => theme.color.magacoffeColor2};
    font-weight: bold;
    z-index: -1;
    display: flex;
    align-items: center;

    ${({ theme }) => theme.media.pc} {
      height: 2rem;
      font-size: 0.7rem;
    }
    ${({ theme }) => theme.media.tab} {
      height: 1.5rem;
      font-size: 0.6rem;
    }
    ${({ theme }) => theme.media.mobile} {
      height: 1rem;
      font-size: 0.4rem;
      padding-left: 0.4rem;
    }
    ${({ theme }) => theme.media.mobileS} {
      height: 1rem;
      font-size: 0.2rem;
      padding-left: 0.4rem;
    }
  }

  &:hover {
    img {
      transform: translateY(-3rem);
      ${({ theme }) => theme.media.pc} {
        transform: translateY(-2rem);
      }
      ${({ theme }) => theme.media.tab} {
        transform: translateY(-1.5rem);
      }
      ${({ theme }) => theme.media.mobile} {
        transform: translateY(-1rem);
      }
    }
  }
`;

export default Menus;
