import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import AdminLink from '../atoms/AdminLink';

const AdminLinks = ({ match }) => {
  return (
    <LinksBox>
      <AdminLink>
        <NavLink to={`${match.path}/users`}>사용자관리</NavLink>
      </AdminLink>
      <AdminLink>
        <NavLink to={`${match.path}/menu`}>메뉴등록</NavLink>
      </AdminLink>
    </LinksBox>
  );
};

const LinksBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  gap: 0.5rem;
`;

export default AdminLinks;
