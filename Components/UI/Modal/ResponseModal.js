import { useDeviceDetect } from '../../../helpers/universalFunctions';

import Input from '../Forms/Input';

import classes from '../UI.module.scss';

const ResponseModal = props => {
	const { isMobile } = useDeviceDetect();

	const className = [classes.Response, props.modalAnimation].join(' ');
	const classNameMob = [classes.ResponseMob, props.modalAnimation].join(' ');
	return (
		<div className={isMobile ? classNameMob : className} style={{ borderColor: props.borderColor }}>
			<p>{props.message}</p>
			<Input type="button" value="OK" className={classes.Confirm} onClick={props.onClick} />
		</div>
	);
};

export default ResponseModal;
