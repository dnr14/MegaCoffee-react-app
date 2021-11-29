import React, { useState } from 'react';
import MainSlide from '@/components/molecules/MainSlide';
import Menus from '@/components/molecules/Menus';
import Banner from '@/components/molecules/Banner';

const Main = () => {
  const [slideList] = useState([
    ['https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/v3.jpg'],
    ['https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/v4.jpg'],
    ['https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/v5.jpg'],
    ['https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/v6.jpg'],
    ['https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/main/v7.jpg'],
  ]);

  return (
    <div style={{ maxWidth: '1700px', margin: '0 auto', width: '100%' }}>
      <MainSlide list={slideList} />
      <Menus />
      <Banner />
    </div>
  );
};

export default Main;
