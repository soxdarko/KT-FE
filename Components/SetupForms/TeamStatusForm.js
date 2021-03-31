import { useState, useEffect, useRef } from 'react';
import { addNewServiceProvider } from '../../api/addNewServiceProvider';
import { addNewEmployee } from '../../api/addNewEmployee';

import Input from '../UI/Forms/Input';

import classes from '../SetupForms/SetupForms.module.scss';

const TeamStatusForm = props => {
	const isPageLoad = useRef(true);
	const [question, setQuestion] = useState({
		message: 'Da li imate više salona?',
		displaySaloon: 'block',
		displayEmployee: 'none',
	});
	const [singleCompany, setSingleCompany] = useState(false);
	const [singleEmployee, setSingleEmployee] = useState(false);

	const addNewServiceProviderHandler = () => {
		const api = addNewServiceProvider({}, props.token)
			.then(response => {
				console.log(response);
				props.setIsLoading(false);
				props.nextStep(),
					setQuestion({
						...question,
						message: 'Da li ste jedini zaposleni?',
						displaySaloon: 'none',
						displayEmployee: 'block',
					});
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					console.log(error.response);
					window.location = '/';
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		api;
	};

	const addNewEmployeeHandler = () => {
		const api = addNewEmployee(props.token)
			.then(response => {
				console.log(response);
				props.setIsLoading(false);
				props.nextStep();
				props.setDisplayteamStatusForm('none');
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					console.log(error.response);
					/* window.location = '/'; */
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		api;
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addNewServiceProviderHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [singleCompany]);

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addNewEmployeeHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [singleEmployee]);

	const singleCompanyHandler = e => {
		e.preventDefault();
		setSingleCompany(true);
		props.setIsLoading(true);
	};

	const singleEmployeeHandler = e => {
		e.preventDefault();
		setSingleEmployee(true);
		props.setIsLoading(true);
	};

	return (
		<form style={{ display: props.displayteamStatusForm }} className={classes.GuideForm}>
			<h3>{question.message}</h3>
			<div className={classes.ChoiceButtonCountainer} style={{ display: question.displaySaloon }}>
				<Input
					type="button"
					value="DA"
					className={[classes.ChoiceButton, classes.Confirm].join(' ')}
					onClick={() => {
						props.setDisplayteamStatusForm('none'),
							props.setDisplayAddSaloonForm('block'),
							props.nextStep();
					}}
				/>
				<Input
					type="button"
					value="NE"
					className={[classes.ChoiceButton, classes.Deny].join(' ')}
					onClick={e => singleCompanyHandler(e)}
				/>
			</div>
			<div className={classes.ChoiceButtonCountainer} style={{ display: question.displayEmployee }}>
				<Input
					type="button"
					value="DA" //Unos radnika u bazu na osnovu registracionih podataka
					className={[classes.ChoiceButton, classes.Confirm].join(' ')}
					onClick={e => singleEmployeeHandler(e)}
				/>
				<Input
					type="button"
					value="NE"
					className={[classes.ChoiceButton, classes.Deny].join(' ')}
					onClick={() => {
						props.setDisplayteamStatusForm('none'),
							props.setDisplayAddEmployeeForm('block'),
							props.nextStep();
					}}
				/>
			</div>
		</form>
	);
};

export default TeamStatusForm;
