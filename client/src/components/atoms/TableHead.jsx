import styled from 'styled-components';

const TableHead = styled.li`
  display: flex;
  position: sticky;
  text-align: center;
  top: 0;
  z-index: 1;
  color: ${({ theme }) => theme.color.black1};
  background-color: ${({ theme }) => theme.color.magacoffeColor1};
  box-shadow: ${({ theme }) => theme.color.boxShadow1};

  span {
    padding: 1rem 0;
    flex: 1;
  }
`;

export default TableHead;
