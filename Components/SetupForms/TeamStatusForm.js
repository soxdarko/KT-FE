import { useState, useEffect, useRef } from 'react';
import { addNewServiceProvider } from '../../api/addNewServiceProvider';

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

	const addNewServiceProviderHandler = () => {
		const api = addNewServiceProvider({})
			.then(response => {
				console.log(response),
					/* props.setIsLoading(false); */
					props.nextStep(),
					setQuestion({
						...question,
						message: 'Da li ste jedini zaposleni?',
						displaySaloon: 'none',
						displayEmployee: 'block',
					});
			})
			.catch(error => {
				/* props.setIsLoading(false); */
				if (error.response) {
					/* error.response.data.map(err => {
						responseHandler(props.setShowResponseModal, modalAnimation, err.errorMessage, 'red');
						props.setShowBackdrop(classes.backdropIn);
					}); */
					console.log(error.response);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		api;
		console.log('one company');
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addNewServiceProviderHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [singleCompany]);

	const singleCompanyHandler = e => {
		e.preventDefault();
		setSingleCompany(true);
		/* props.setIsLoading(true); */
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
					onClick={() => {
						props.setDisplayteamStatusForm('none'),
							props.setDisplayAddServicesForm('block'),
							props.nextStep();
					}}
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
