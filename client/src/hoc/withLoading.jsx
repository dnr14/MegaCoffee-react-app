import React from 'react';
import Loading from '@/components/atoms/Loading';

const withLoading = Component => {
  const hoc = props => {
    const { loading } = props;

    return (
      <>
        <Loading loading={loading} />
        <Component {...props} />
      </>
    );
  };

  return hoc;
};

export default withLoading;
