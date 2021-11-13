import styled from 'styled-components';

const AdminLink = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow1};

  a {
    font-weight: bold;
    display: block;
    padding: 1rem;
    transition: background-color 0.25s ease-in;
    background-color: ${({ theme }) => theme.color.magacoffeColor1};
    opacity: 0.5;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .active {
    opacity: 1;
  }
`;

export default AdminLink;
