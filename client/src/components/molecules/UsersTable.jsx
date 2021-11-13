import React from 'react';
import TableHead from '../atoms/TableHead';
import TableLayout from '../atoms/TableLayout';

const UsersTable = ({ heads, onClick, children }) => {
  return (
    <TableLayout onClick={onClick}>
      <TableHead>
        {heads.map((head, idx) => (
          <span key={idx}>{head}</span>
        ))}
      </TableHead>
      {children}
    </TableLayout>
  );
};

export default UsersTable;
