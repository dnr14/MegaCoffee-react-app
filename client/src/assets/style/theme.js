const size = {
  mobile: '770px',
  tabletS: '1023px',
  tabletM: '1220px',
  tabletL: '1280px',
  laptop: '1460px',
  desktop: '1700px',
};

const theme = {
  magacoffeColor: '#ff9f43',
  backgroundColor: '#f7fbff',
  whiteColor: '#fff',
  shadowColor: 'rgba(45, 52, 54,0.5)',
  borderRadius: '5px',
  maxWidth: '1100px',
  mobile: `(max-width: ${size.mobile})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tabletM: `(max-width: ${size.tabletM})`,
  tabletL: `(max-width: ${size.tabletL})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default theme;
