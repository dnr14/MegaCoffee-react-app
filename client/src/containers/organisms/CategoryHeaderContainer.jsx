import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import CategoryHeader from '@/components/molecules/CategoryHeader';

const CategoryHeaderContainer = ({ fullUrls }) => {
  const match = useRouteMatch();
  const els = fullUrls.map(url => ({
    url,
    checked: match.url === url,
    text: url.split('/')[2],
  }));

  return <CategoryHeader els={els} />;
};

export default CategoryHeaderContainer;
