import Input from '../Forms/Input';

import classes from '../UI.module.scss';

const ConfirmModal = props => {
	const className = [classes.Confirmation, props.animation].join(' ');
	return (
		<form className={className} style={{ display: props.display }}>
			<p>{props.message}</p>
			<Input
				type="button"
				value={props.submitValue}
				onClick={props.onSubmit}
				className={classes.Confirm}
			/>
			<Input type="button" value="ODUSTANI" onClick={props.onDecline} className={classes.Decline} />
		</form>
	);
};

export default ConfirmModal;