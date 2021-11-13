import React from 'react';
import styled from 'styled-components';
import Error from '../atoms/Error';
import Relative from './Relative';

const Search = ({ els, handleUsersSearch }) => {
  return (
    <Container>
      <form onSubmit={handleUsersSearch}>
        {els.map(({ props }, idx) => (
          <Relative key={idx}>
            <Relative.FormInput {...props} />
            {props.value && (
              <Relative.Cancel id={props.id} onClick={props.onClick} />
            )}
            {props.error && <Error>{props.error}</Error>}
          </Relative>
        ))}
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 0 1rem 1rem 1rem;
`;

export default Search;
