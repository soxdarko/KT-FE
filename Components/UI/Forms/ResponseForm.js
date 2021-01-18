import Input from './Input';
import Backdrop from '../Backdrop';

import classes from '../UI.module.scss';

const ResponseForm = props => (
	<>
		<Backdrop display={props.display} zIndex="499" />
		<div
			className={[classes.Confirmation, classes.Response].join(' ')}
			style={{ display: props.display, borderColor: props.borderColor }}>
			<p>{props.message}</p>
			<Input type="button" value="OK" className={classes.Confirm} onClick={props.onClick} />
		</div>
	</>
);

export default ResponseForm;
