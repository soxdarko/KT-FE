import { useEffect, useRef } from 'react';
import { saveEmployees } from '../../api/saveEmployees';

import QuestionForm from './QuestionForm/QuestionForm';

const EmployeeQuestionForm = props => {
	const isPageLoad = useRef(true);

	const singleEmployeeHandler = e => {
		e.preventDefault();
		props.setSingleEmployee(true);
		props.setDisplayAddServicesForm('block');
		props.setIsLoading(true);
	};

	const addNewEmployeeHandler = () => {
		const api = saveEmployees([])
			.then(response => {
				console.log(response);
				props.setIsLoading(false);
				props.setDisplayEmployeeQuestionForm('none');
				return response;
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					console.log(error.response);
					props.setDisplayEmployeeQuestionForm('none');
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto trece');
				}
			});
		api;
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addNewEmployeeHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.singleEmployee]);

	const displayForm = () => {
		if (props.userGuideStatus === 'ServiceProviders') {
			props.setDisplayGreeting('none');
			props.setDisplayEmployeeQuestionForm('block');
		} else {
			props.setDisplayEmployeeQuestionForm('none');
		}
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		displayForm();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<QuestionForm
			title="Da li ste Vi jedini zaposleni?"
			displayQuestionForm={props.displayEmployeeQuestionForm}
			onSubmit={e => {
				singleEmployeeHandler(e);
			}}
			onDecline={() => {
				props.setDisplayEmployeeQuestionForm('none'), props.setDisplayAddEmployeeForm('block');
			}}
		/>
	);
};

export default EmployeeQuestionForm;