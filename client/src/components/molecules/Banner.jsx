import React from 'react';
import styled from 'styled-components';

const Banner = () => {
  return (
    <Container>
      <div>
        <img
          src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/line_banner.jpg"
          alt="line_banner"
        />
      </div>
      <div>
        <img
          src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/01.jpg"
          alt="banner"
        />
      </div>
      <div>
        <img
          src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/02.jpg"
          alt="banner"
        />
      </div>
      <div>
        <img
          src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/03.jpg"
          alt="banner"
        />
      </div>
      <div>
        <img
          src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/04.jpg"
          alt="banner"
        />
      </div>
      <div>
        <img
          src="https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/slide_interior.jpg"
          alt="banner"
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  div:nth-child(2) {
    background: #fed337;
  }
  div:nth-child(4) {
    background-color: #e4e4e4;
  }
  div:nth-child(5) {
    background-color: #fed337;
  }
  div:last-child {
    background-color: #3c2517;
  }

  img {
    display: block;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export default Banner;
