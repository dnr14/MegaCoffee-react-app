import MenuBar from '../atoms/MenuBar';
import SelectBox from '../atoms/SelectBox';
import UlWrapper from '../atoms/UlWrapper';
import styled from 'styled-components';

const InsertMenubar = ({ currentId, ENUMS, isOpen, setIsOpen, menuClick, menuClicked }) => {
  return (
    <Layout>
      <SelectBox onClick={menuClick}>
        {ENUMS[currentId]}
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </SelectBox>
      {isOpen && (
        <MenuBar isOpen={isOpen} setIsOpen={setIsOpen}>
          <UlWrapper onClick={menuClicked}>
            {Object.keys(ENUMS).map(key => (
              <li key={key} id={`${key}`} className={key === currentId ? 'checked' : ''}>
                {ENUMS[key]}
              </li>
            ))}
          </UlWrapper>
        </MenuBar>
      )}
    </Layout>
  );
};

const Layout = styled.div`
  position: relative;
`;

export default InsertMenubar;
