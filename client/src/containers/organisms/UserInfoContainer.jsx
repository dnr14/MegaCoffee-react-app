import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userUpdate } from '@/api/users';
import LoginForm from '@/components/molecules/LoginForm';
import Relative from '@/components/molecules/Relative';
import ProfileImg from '@/components/molecules/ProfileImg';
import LoginInput from '@/components/molecules/LoginInput';
import LoginButton from '@/components/molecules/LoginButton';
import NoProfile from '@/components/atoms/NoProfile';
import FormLabel from '@/components/atoms/FormLabel';
import UserInfoInput from '@/components/molecules/UserInfoInput';
import * as validations from '@/utils/validations';
import Error from '@/components/atoms/Error';
import useFetch from '@/hooks/useFetch';
import Loading from '@/components/atoms/Loading';
import Modal from '@/components/atoms/Modal';
import useForm from '@/hooks/useForm';

const nickNameStateInit = {
	value: '',
	error: null,
};

const UserInfoContainer = () => {
	const history = useHistory();
	const state = useSelector(({ login }) => login);
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const { form, handleChange, handleClick } = useForm(false);
	const [nickNameState, setNickNameState] = useState(nickNameStateInit);

	const { state: fetch, callApi } = useFetch();
	const { id, name, email, birthDay, img, thumbnail } = state;
	const { error, loading, success } = fetch;
	const { pwd, pwdConfirm } = form;

	const handleNickNameChange = e => {
		const result = nickNameValidation(e.target.value);
		setNickNameState(result);
	};
	const handleNickNameValueRemove = () => setNickNameState(nickNameStateInit);

	const els = [
		{
			value: id,
			name: '아이디',
		},
		{
			value: name,
			name: '이름',
		},
		{
			value: email,
			name: '이메일',
		},
		{
			value: birthDay,
			name: '생년월일',
		},
	];

	const updateEls = [
		{
			name: '기존 패스워드',
			props: {
				id: 'pwd',
				type: 'password',
				value: pwd.data,
				error: pwd.error,
			},
			onClick: handleClick,
			onChange: handleChange,
		},
		{
			name: '패스워드 변경',
			props: {
				id: 'pwdConfirm',
				type: 'password',
				value: pwdConfirm.data,
				error: pwdConfirm.error,
			},
			onClick: handleClick,
			onChange: handleChange,
		},
		{
			name: '닉네임',
			props: {
				id: 'nickName',
				type: 'text',
				value: nickNameState.value,
				error: nickNameState.error,
			},
			onClick: handleNickNameValueRemove,
			onChange: handleNickNameChange,
		},
	];

	const handleProfileImgChange = async e => {
		if (e.target.files.length === 1 && /image\/.*/gi.test(e.target.files[0].type)) {
			const toBase64 = file =>
				new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = () => resolve(reader.result);
					reader.onerror = error => reject(error);
				});

			try {
				const result = await toBase64(e.target.files[0]);
				setProfileImg(result);
			} catch (error) {
				setProfileImg(null);
			}
		} else {
			setProfileImg(null);
		}
	};

	// 회원 수정
	const handleFileUpload = e => {
		e.preventDefault();
		const file = e.target.file.files[0];
		const { value: nickName } = e.target.nickName;
		const { value: pwd } = e.target.pwd;
		const { value: pwdConfirm } = e.target.pwdConfirm;
		const formData = new FormData();
		if (!validations.emptyCheck(nickName)) {
			formData.append('nickName', nickName);
		}
		if (!validations.emptyCheck(pwd) && !validations.emptyCheck(pwdConfirm)) {
			formData.append('pwd', pwd);
			formData.append('newPwd', pwdConfirm);
		}
		if (file) {
			formData.append('thumbnail', file);
		}
		console.log(nickName, file, pwd, pwdConfirm);
		callApi(() => userUpdate(id, formData));
	};

	useEffect(() => setNickNameState({ value: state.nickName ?? '', error: null }), [state]);

	useEffect(() => {
		if (!validations.emptyCheck(thumbnail)) {
			setProfileImg(thumbnail);
		}
	}, [thumbnail]);

	useEffect(() => {
		if (error) {
			setMessage(<span>{error.message}</span>);
			setIsOpen(prevState => !prevState);
		}
	}, [error]);

	useEffect(() => {
		if (success) {
			(async () => {
				setIsOpen(prevState => !prevState);
				setMessage(<span>수정이 되었습니다. 다시 로그인을 해주세요.</span>);
				await new Promise(res => setTimeout(res, 2000));
				history.push('/logout');
			})();
		}
	}, [success, history]);

	const profile = validations.emptyCheck(profileImg) ? <NoProfile /> : <img src={profileImg} alt="profile" />;

	return (
		<>
			<Loading loading={loading} />
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				{message}
			</Modal>
			<LoginForm onSubmit={handleFileUpload}>
				<ProfileImg>
					<label htmlFor="file">
						<div>{profile}</div>
						<input type="file" id="file" accept="image/*" onChange={handleProfileImgChange} />
					</label>
					<p>아직도 프로필 사진이 없으신가요?</p>
					<p>등록을 원하시면 사진을 클릭해주세요.</p>
				</ProfileImg>
				{els.map(({ name, value }, idx) => (
					<div key={idx}>
						<FormLabel>{name}</FormLabel>
						<UserInfoInput value={value ?? ''} readOnly />
					</div>
				))}
				{updateEls.map(({ name, props, onChange, onClick }, idx) => (
					<div key={idx}>
						<FormLabel htmlFor={props.id}>{name}</FormLabel>
						<Relative>
							<LoginInput {...props} onChange={onChange} />
							{props.value && <Relative.Cancel id={props.id} onClick={onClick} />}
							{props.error && (
								<Error>
									<span>{props.error}</span>
								</Error>
							)}
						</Relative>
					</div>
				))}

				<div>
					<LoginButton
						disabled={
							validations.emptyCheck(nickNameState.value) || nickNameState.error || pwd.error || pwdConfirm.error
						}
					>
						등록하기
					</LoginButton>
				</div>
			</LoginForm>
		</>
	);
};

const nickNameValidation = data => {
	const prevValue = data.slice(0, data.length - 1);
	if (validations.whiteSpaceCheck(data)) {
		return { value: prevValue, error: '공백이있습니다.' };
	}
	if (validations.specialSymbolCheck(data)) {
		return { value: prevValue, error: '특수문자가 있습니다.' };
	}
	if (validations.minLengthCheck(data, 2)) {
		return { value: data, error: '최소 2자 이상입니다.' };
	}
	if (validations.maxLengthCheck(data, 10)) {
		return { value: prevValue, error: '최대 10자 이하입니다.' };
	}
	return { value: data, error: null };
};

export default UserInfoContainer;
