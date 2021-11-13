import styled from 'styled-components';

const UlWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    cursor: pointer;
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
  }
  li + li {
    border-top: 1px solid rgb(241, 243, 245);
  }
  li:hover {
    background: rgb(248, 249, 250);
    color: ${({ theme }) => theme.color.magacoffeColor1};
  }
`;

export default UlWrapper;
