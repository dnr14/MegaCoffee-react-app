import React, { useState } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import CategoryHeaderContainer from '../organisms/CategoryHeaderContainer';
import RootRedirect from '@/Routers/RootRedirect';
import CategoryMainContainer from '../organisms/CategoryMainContainer';

const Category = () => {
  const match = useRouteMatch();
  const { path } = match;
  const [fullUrls] = useState([
    `${path}/coffee`,
    `${path}/beverage`,
    `${path}/tea`,
    `${path}/juice`,
    `${path}/ade`,
  ]);

  // 레이아웃을 다른거쓰자
  return (
    <div style={{ maxWidth: '1000px', width: '1000px', margin: '0 auto' }}>
      <div style={{ margin: '100px 0 100px 0' }}>
        <Switch>
          <Route
            path={`${path}/:id`}
            render={({ match }) => {
              if (!fullUrls.includes(match.url)) return <RootRedirect />;
              return (
                <>
                  <CategoryHeaderContainer fullUrls={fullUrls} />
                  <CategoryMainContainer />
                </>
              );
            }}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Category;
