import { css } from 'styled-components';

export const size = {
  pc: '75em', // 1200px
  tab: '56.25em', // 900px
  mobile: '31.25em', // 500px
  mobileS: '23.125em', // 370px
};

const theme = {
  color: {
    magacoffeColor1: '#fed338',
    magacoffeColor2: 'rgb(54, 54, 54)',
    coffee1: '#572526',
    coffee2: '#d1a766',
    black1: '#000',
    white1: '#f7fbff',
    white2: '#fff',
    red1: '#e74c3c',
    red2: '#572526',
    green1: '#2ecc71',
    shadowColor: 'rgba(45, 52, 54,0.5)',
    backgroundColor1: 'rgb(233, 236, 239)',
    skeletonColor: 'rgba(149, 165, 166, 0.2)',
  },
  media: {
    pc: `@media screen and (max-width: ${size.pc})`,
    tab: `@media screen and (max-width: ${size.tab})`,
    mobile: `@media screen and (max-width: ${size.mobile})`,
    mobileS: `@media screen and (max-width: ${size.mobileS})`,
  },
  borderRadius1: '5px',
  borderRadius2: '20px',
  maxWidth: '1100px',
  boxShadow1: 'rgb(0 0 0 / 4%) 0px 4px 16px 0px',
  skeletonAnimation: css`
    overflow: hidden;
    position: relative;
    &::before {
      z-index: -1;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
      animation: loading 1s infinite linear;
    }

    @keyframes loading {
      0% {
        transform: translateX(-10%);
      }
      50%,
      100% {
        transform: translateX(100%);
      }
    }
  `,
};

export default theme;
