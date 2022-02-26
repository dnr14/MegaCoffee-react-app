import * as validations from '@/utils/validations';
import { useCallback, useEffect, useReducer } from 'react';

const ID_ADD = 'ID_ADD';
const PWD_ADD = 'PWD_ADD';
const NAME_ADD = 'NAME_ADD';
const PWD_CONFIRM_ADD = 'PWD_CONFIRM_ADD';
const BIRTHDAY_ADD = 'BIRTHDAY_ADD';
const EMAIL_ADD = 'EMAIL_ADD';
const RESET = 'RESET';
const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export const idAddAction = id => ({ type: ID_ADD, id });
export const pwdAddAction = pwd => ({ type: PWD_ADD, pwd });
export const nameAddAction = name => ({ type: NAME_ADD, name });
export const pwdConfirmAddAction = pwdConfirm => ({
  type: PWD_CONFIRM_ADD,
  pwdConfirm,
});
const birthDayAddACtion = birthDay => ({ type: BIRTHDAY_ADD, birthDay });
const emailAddAction = email => ({ type: EMAIL_ADD, email });
const resetAction = id => ({ type: RESET, id });
export const loadingAction = () => ({ type: LOADING });
export const successAction = () => ({ type: SUCCESS });
export const errorAction = error => ({ type: ERROR, error });

const INIT = {
  id: { data: '', error: null },
  pwd: { data: '', error: null },
  pwdConfirm: { data: '', error: null },
  birthDay: { data: '', error: null },
  name: { data: '', error: null },
  email: { data: '', error: null },
  loading: null,
  success: null,
  error: null,
};

const ENUM = Object.freeze({
  id: 'id',
  pwd: 'pwd',
  pwdConfirm: 'pwdConfirm',
  birthDay: 'birthDay',
  name: 'name',
  email: 'email',
});

const reducer = (state, action) => {
  switch (action.type) {
    case ID_ADD:
      return {
        ...state,
        id: action.id,
      };
    case PWD_ADD:
      return {
        ...state,
        pwd: action.pwd,
      };
    case PWD_CONFIRM_ADD:
      return {
        ...state,
        pwdConfirm: action.pwdConfirm,
      };
    case BIRTHDAY_ADD:
      return {
        ...state,
        birthDay: action.birthDay,
      };
    case NAME_ADD:
      return {
        ...state,
        name: action.name,
      };
    case EMAIL_ADD:
      return {
        ...state,
        email: action.email,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS:
      return {
        ...state,
        loading: null,
        success: true,
      };
    case ERROR:
      return {
        ...state,
        loading: null,
        success: null,
        error: action.error,
      };
    case RESET:
      return {
        ...state,
        [action.id]: { data: '', error: null },
      };
    default:
      throw new Error('Action not Found');
  }
};

const useForm = (isConfirmPasswordCheck = true) => {
  const [form, dispatch] = useReducer(reducer, INIT);

  const handleClick = useCallback(e => dispatch(resetAction(e.target.id)), []);

  const handleChange = useCallback(
    e => {
      const { target } = e;
      const { value, id } = target;
      let result;
      switch (id) {
        case ENUM.id:
          result = idValidation(value);
          dispatch(idAddAction(result));
          return;
        case ENUM.pwd:
          result = pwdValidation(isConfirmPasswordCheck, value);
          dispatch(pwdAddAction(result));
          return;
        case ENUM.pwdConfirm:
          result = pwdConfirmValidation(isConfirmPasswordCheck, value);
          dispatch(pwdConfirmAddAction(result));
          return;
        case ENUM.birthDay:
          result = birthDayValidation(value);
          dispatch(birthDayAddACtion(result));
          return;
        case ENUM.name:
          result = nameValidation(value);
          dispatch(nameAddAction(result));
          return;
        case ENUM.email:
          result = emailValidation(value);
          dispatch(emailAddAction(result));
          return;
        default:
          throw new Error('Name not Found');
      }
    },
    [isConfirmPasswordCheck]
  );

  useEffect(() => {
    if (
      (form.pwdConfirm.error === null && form.pwd.error !== null) ||
      (form.pwdConfirm.error !== null && form.pwd.error === null) ||
      (form.pwdConfirm.error !== null && form.pwd.error !== null)
    ) {
      const { data: pwdConfirm } = form.pwdConfirm;
      const { data: pwd } = form.pwd;
      if (pwdConfirm === pwd && String(pwdConfirm).length >= PWD_MIN_LENG && String(pwd).length >= PWD_MIN_LENG) {
        let result = pwdValidation(isConfirmPasswordCheck, pwdConfirm, pwd);
        dispatch(pwdAddAction(result));
        result = pwdConfirmValidation(isConfirmPasswordCheck, pwd, pwdConfirm);
        dispatch(pwdConfirmAddAction(result));
      }
    }
  }, [form.pwd, form.pwdConfirm, isConfirmPasswordCheck]);

  return { form, handleChange, handleClick, dispatch };
};

// value 이상 없다면 data : 새로운 값 , error :null
// value 이상 있다면 data : 이전 값 , error : 에러 메세지
const ID_MAX_LENG = 10;
const ID_MIN_LENG = 5;
const PWD_MAX_LENG = 10;
const PWD_MIN_LENG = 6;
const BIRTH_DAY_MIN_LENG = 6;
const NAME_MAX_LENG = 10;
const NAME_MIN_LENG = 3;
const EMAIL_MAX_LENG = 30;
const ERROR_MESSAGES = Object.freeze({
  whiteSpaceCheck: '🚫 공백문자는 입력하지 못합니다.',
  koreaLengCheck: '🚫 한글은 입력하지 못합니다.',
  specialSymbolCheck: '🚫 특수기호는 입력하지 못합니다.',
  maxLengthCheck: maxLeng => `🚫 ${maxLeng}자 이하로 입력해주세요.`,
  minLengthCheck: minLeng => `🚫 최소 ${minLeng}자 이상 입력해주세요.`,
  englishCheck: '🚫 영어는 입력하지 못합니다.',
  pwdNotMatch: '🚫 비밀번호가 다릅니다.',
  emailSpecialSymbol: '🚫 공백문자는 입력하지 못합니다.',
  emailCheck: '🚫 이메일 형식이 아닙니다.',
});

const isError = (data, message) => ({ data, error: message });
const isSuccess = data => ({ data, error: null });
// 아이디 검사
const idValidation = value => {
  const prevValue = value.slice(0, -1);
  if (validations.koreaLengCheck(value)) {
    return isError(prevValue, ERROR_MESSAGES.koreaLengCheck);
  }
  if (validations.specialSymbolCheck(value)) {
    return isError(prevValue, ERROR_MESSAGES.specialSymbolCheck);
  }

  if (validations.maxLengthCheck(value, ID_MAX_LENG)) {
    return isError(prevValue, ERROR_MESSAGES.maxLengthCheck(ID_MAX_LENG));
  }
  if (validations.whiteSpaceCheck(value)) {
    return isError(prevValue, ERROR_MESSAGES.whiteSpaceCheck);
  }

  if (validations.minLengthCheck(value, ID_MIN_LENG)) {
    return isError(value, ERROR_MESSAGES.minLengthCheck(ID_MIN_LENG));
  }
  return isSuccess(value);
};
// 비밀번호 검사
const pwdValidation = (isConfirmPasswordCheck, value, pwdConfirm) => {
  const prevValue = value.slice(0, -1);
  if (validations.maxLengthCheck(value, PWD_MAX_LENG)) {
    return isError(prevValue, ERROR_MESSAGES.maxLengthCheck(PWD_MAX_LENG));
  }
  if (validations.minLengthCheck(value, PWD_MIN_LENG)) {
    return isError(value, ERROR_MESSAGES.minLengthCheck(PWD_MIN_LENG));
  }
  if (validations.whiteSpaceCheck(value)) {
    return isError(prevValue, ERROR_MESSAGES.whiteSpaceCheck);
  }
  if (pwdConfirm !== value && isConfirmPasswordCheck) {
    return isError(value, ERROR_MESSAGES.pwdNotMatch);
  }
  return isSuccess(value);
};
// 비밀번호재확인 검사
const pwdConfirmValidation = (isConfirmPasswordCheck, value, pwd) => {
  const prevValue = value.slice(0, -1);
  if (validations.maxLengthCheck(value, PWD_MAX_LENG)) {
    return isError(prevValue, ERROR_MESSAGES.maxLengthCheck(PWD_MAX_LENG));
  }
  if (validations.minLengthCheck(value, PWD_MIN_LENG)) {
    return isError(value, ERROR_MESSAGES.minLengthCheck(PWD_MIN_LENG));
  }
  if (validations.whiteSpaceCheck(value)) {
    return isError(prevValue, ERROR_MESSAGES.whiteSpaceCheck);
  }
  if (pwd !== value && isConfirmPasswordCheck) {
    return isError(value, ERROR_MESSAGES.pwdNotMatch);
  }

  return isSuccess(value);
};
// 생일 검사
const birthDayValidation = value => {
  const prevValue = value.slice(0, -1);
  if (validations.specialSymbolCheck(value)) {
    return isError(prevValue, ERROR_MESSAGES.specialSymbolCheck);
  }
  if (validations.whiteSpaceCheck(value)) {
    return isError(prevValue, ERROR_MESSAGES.whiteSpaceCheck);
  }
  if (validations.koreaLengCheck(value)) {
    return isError(prevValue, ERROR_MESSAGES.koreaLengCheck);
  }
  if (validations.englishCheck(value)) {
    return isError(prevValue, ERROR_MESSAGES.englishCheck);
  }
  if (validations.maxLengthCheck(value, BIRTH_DAY_MIN_LENG)) {
    return isError(prevValue, null);
  }
  if (validations.minLengthCheck(value, BIRTH_DAY_MIN_LENG)) {
    return isError(value, ERROR_MESSAGES.minLengthCheck(BIRTH_DAY_MIN_LENG));
  }
  return isSuccess(value);
};
// 이름 검사
const nameValidation = value => {
  const prevValue = value.slice(0, -1);
  if (validations.specialSymbolCheck(value)) {
    return isError(prevValue, ERROR_MESSAGES.specialSymbolCheck);
  }
  if (validations.maxLengthCheck(value, NAME_MAX_LENG)) {
    return isError(prevValue, ERROR_MESSAGES.maxLengthCheck(NAME_MAX_LENG));
  }
  if (validations.minLengthCheck(value, NAME_MIN_LENG)) {
    return isError(value, ERROR_MESSAGES.minLengthCheck(NAME_MIN_LENG));
  }
  if (validations.whiteSpaceCheck(value)) {
    return isError(prevValue, ERROR_MESSAGES.whiteSpaceCheck);
  }
  return isSuccess(value);
};
// 이메일 검사
const emailValidation = value => {
  const prevValue = value.slice(0, -1);
  if (validations.emailSpecialSymbol(value)) {
    return isError(prevValue, ERROR_MESSAGES.emailSpecialSymbol);
  }
  if (validations.maxLengthCheck(value, EMAIL_MAX_LENG)) {
    return isError(prevValue, ERROR_MESSAGES.maxLengthCheck(EMAIL_MAX_LENG));
  }
  if (validations.emailCheck(value)) {
    return isError(value, ERROR_MESSAGES.emailCheck);
  }
  return isSuccess(value);
};

export default useForm;
