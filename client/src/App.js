import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Routers from './Routers';
import Bottom from './containers/templates/Bottom';
import { getAccessToken } from './utils/localstorege';
import { loginSelector, userInfoAsync } from './modules/login/index';
import { customHistory } from '@/modules/store';
import Top from './containers/templates/Top';

const App = () => {
	const login = useSelector(loginSelector);
	const { error } = login;
	const dispatch = useDispatch();

	useEffect(() => {
		const accessToken = getAccessToken();
		if (accessToken) {
			// api가 실패되면 리젝티드로 넘어가고 예상치 못한 에러는 여기로 넘어온다. 에러처리를 해줘야된다.
			// 썽크는 수순하게 api에러에대해서 만 신경쓰면된다.
			dispatch(userInfoAsync());
		}
	}, [dispatch]);

	useEffect(() => {
		if (error) alert(error);
	}, [error]);

	return (
		<BrowserRouter history={customHistory}>
			<Top />
			<Routers />
			<Bottom />
		</BrowserRouter>
	);
};

export default App;
