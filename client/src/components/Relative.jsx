import React from 'react';
import styled from 'styled-components';
import Cancel from '@/components/Cancel';
import FormInput from '@/components/FormInput';

// 설계 이유
// 1. 자신이 쓰고 싶은 input 컴포넌트가 있다면 children을 통해서 주입받으면된다.
// 2. 없다면 기본 FormInput 컴포넌트를 쓰면 된다.
// 3. Relative 컴포넌트 단독으로 사용 가능 또는 input + cancel 컴포넌트 조합으로
// 캔슬 버튼 이용 가능
// 확장성을 고려했다고 생각이 든다.
const Relative = ({ children, ...rest }) => {
  return <StyledDiv {...rest}>{children}</StyledDiv>;
};
Relative.FormInput = FormInput;
Relative.Cancel = Cancel;

const StyledDiv = styled.div`
  position: relative;
`;

export default Relative;
