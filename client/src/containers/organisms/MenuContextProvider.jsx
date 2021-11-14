import React, { createContext, useEffect, useState } from 'react';
import { menuSelect } from '@/api/admin';

export const MenuContext = createContext(null);

const MenuContextProvider = ({ children }) => {
  const [list, setList] = useState({});
  useEffect(() => menuSelect().then(({ data }) => setList(data)), []);

  return (
    <MenuContext.Provider value={{ list, setList }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
