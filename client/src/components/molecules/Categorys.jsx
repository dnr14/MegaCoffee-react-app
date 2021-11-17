import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CategoryLabel from '../atoms/CategoryLabel';
import menuCoffee from '@/assets/images/category/menuCoffee.png';
import menuBeverage from '@/assets/images/category/menuBeverage.png';
import menuTea from '@/assets/images/category/menuTea.png';
import menuJuice from '@/assets/images/category/menuJuice.png';
import menuAde from '@/assets/images/category/menuAde.png';

const IMG_EUMS = {
  coffee: menuCoffee,
  beverage: menuBeverage,
  tea: menuTea,
  juice: menuJuice,
  ade: menuAde,
};

const Categorys = ({ els }) => {
  const { id } = useParams();
  const categoryHeaders = els.map(({ url, checked, text }, idx) => (
    <CategoryLabel key={idx} checked={checked}>
      <Link to={url}>{String(text).toUpperCase()}</Link>
    </CategoryLabel>
  ));

  return (
    <>
      <CategoryHeaderLayout>{categoryHeaders}</CategoryHeaderLayout>
      <CategoryHeaderImgLayout>
        <img src={IMG_EUMS[id]} alt="title" />
      </CategoryHeaderImgLayout>
    </>
  );
};

const CategoryHeaderLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const CategoryHeaderImgLayout = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.7rem 0;
  border-bottom: 1px solid gray;
`;

export default Categorys;
