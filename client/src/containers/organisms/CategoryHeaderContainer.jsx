import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Categorys from '@/components/molecules/Categorys';

const CategoryHeaderContainer = ({ path, urls }) => {
  const match = useRouteMatch();
  const categoryHeaderEls = urls.map(url => ({
    url: `${path}/${url}`,
    checked: match.url === `${path}/${url}`,
    text: url,
  }));

  return <Categorys els={categoryHeaderEls} />;
};

export default CategoryHeaderContainer;
