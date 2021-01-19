import useDeviceDetect from '../../../utils/UseDeviceDetect';

import Input from './Input';
import Backdrop from '../Backdrop';

import classes from '../UI.module.scss';

const ResponseForm = props => {
	const { isMobile } = useDeviceDetect();
	return (
		<>
			<Backdrop display={props.display} zIndex="499" />
			<div
				className={isMobile ? classes.ResponseMob : classes.Response}
				style={{ display: props.display, borderColor: props.borderColor }}>
				<p>{props.message}</p>
				<Input type="button" value="OK" className={classes.Confirm} onClick={props.onClick} />
			</div>
		</>
	);
};

export default ResponseForm;
