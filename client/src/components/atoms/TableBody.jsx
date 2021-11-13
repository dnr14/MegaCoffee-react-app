import styled from 'styled-components';

const TableBody = styled.li`
  display: flex;
  position: relative;

  & > div {
    position: relative;
    display: flex;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    padding: 0.5rem 0;
    justify-content: center;
    align-items: center;
  }
  &:nth-child(odd) {
    background-color: white;
  }
  &:hover {
    font-weight: bold;
  }
  .delete {
    font-weight: bold;
    color: ${({ theme }) => theme.color.red1};
  }
  .stop {
    font-weight: bold;
    color: ${({ theme }) => theme.color.magacoffeColor1};
  }
  .normal {
    font-weight: bold;
    color: ${({ theme }) => theme.color.green1};
  }
`;

export default TableBody;
