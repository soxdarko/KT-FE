import classes from '../UI.module.scss';

import Input from './Input';

const Confirm = props => (
	<form style={{ display: props.display }} className={classes.Form}>
		<p>{props.title}</p>
		<Input type="submit" value={props.submitValue} onClick={props.submit} />
		<Input type="button" value="ODUSTANI" onClick={props.decline} />
	</form>
);

export default Confirm;
