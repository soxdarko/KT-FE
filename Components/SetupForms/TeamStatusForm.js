import { useState } from 'react';
import Input from '../UI/Forms/Input';

import classes from '../UI/UI.module.scss';

const TeamStatusForm = props => {
	const [question, setQuestion] = useState({
		message: 'Da li imate više salona?',
		displaySaloon: 'block',
		displayEmployee: 'none',
	});
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
					onClick={() => {
						props.nextStep(),
							setQuestion({
								...question,
								message: 'Da li ste jedini zaposleni?',
								displaySaloon: 'none',
								displayEmployee: 'block',
							});
					}}
				/>
			</div>
			<div className={classes.ChoiceButtonCountainer} style={{ display: question.displayEmployee }}>
				<Input
					type="button"
					value="DA" //Unos radnika u bazu na osnovu registracionih podataka
					className={[classes.ChoiceButton, classes.Confirm].join(' ')}
					onClick={() => {
						props.setDisplayteamStatusForm('none'), props.nextStep();
					}}
				/>
				<Input
					type="button"
					value="NE"
					className={[classes.ChoiceButton, classes.Deny].join(' ')}
					onClick={() => {
						props.setDisplayteamStatusForm('none'), props.nextStep();
					}}
				/>
			</div>
		</form>
	);
};

export default TeamStatusForm;
