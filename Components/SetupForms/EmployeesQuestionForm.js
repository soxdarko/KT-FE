import { useEffect, useRef } from 'react';
import { saveEmployees } from '../../api/saveEmployees';

import QuestionForm from './QuestionForm/QuestionForm';

const EmployeeQuestionForm = props => {
	const isComponentLoad = useRef(true);

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
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					console.log(error.response);
					error.response.data.map(err => {
						props.errorMessage(err.errorMessage);
					});
				} else if (error.request) {
					console.log(error.request);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				} else {
					console.log(error);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				}
			});
		api;
	};

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}
		addNewEmployeeHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.singleEmployee]);

	function onDecline() {
		props.setDisplayEmployeeQuestionForm('none');
		props.setDisplayAddEmployeeForm('block');
	}

	const displayForm = () => {
		if (props.userGuideStatus === 'ServiceProviders') {
			props.setDisplayGreeting('none');
			props.setDisplayEmployeeQuestionForm('block');
		} else {
			props.setDisplayEmployeeQuestionForm('none');
		}
	};

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}
		displayForm();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<QuestionForm
			title="Da li ste Vi jedini zaposleni?"
			displayQuestionForm={props.displayEmployeeQuestionForm}
			onSubmit={e => singleEmployeeHandler(e)}
			onDecline={() => onDecline()}
		/>
	);
};

export default EmployeeQuestionForm;
