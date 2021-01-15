import classes from '../UI.module.scss';

import Input from './Input';

const Confirmation = props => (
	<form style={{ display: props.display, bottom: props.bottom }} className={classes.Confirmation}>
		<p>{props.info}</p>
		<Input
			type="button"
			value={props.submitValue}
			onClick={props.onSubmit}
			className={classes.Confirm}
		/>
		<Input type="button" value="ODUSTANI" onClick={props.onDecline} className={classes.Decline} />
	</form>
);

export default Confirmation;
