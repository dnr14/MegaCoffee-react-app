import styled from 'styled-components';

const SelectBox = styled.div`
  display: flex;
  background: white;
  height: 2rem;
  width: 5rem;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  color: rgb(73, 80, 87);
  font-size: 0.875rem;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px;
  cursor: pointer;

  & > svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  ${({ theme }) => theme.media.pc} {
    width: 4.25rem;
    font-size: 0.75rem;
  }
`;

export default SelectBox;
