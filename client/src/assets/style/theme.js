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
};

export default theme;
