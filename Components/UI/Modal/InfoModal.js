import { useDeviceDetect } from '../../../helpers/universalFunctions';
import Backdrop from '../Backdrop';

import classes from '../UI.module.scss';

const InfoModal = props => {
	const { isMobile } = useDeviceDetect();
	const className = [classes.Response, props.modalAnimation].join(' ');
	const classNameMob = [classes.ResponseMob, props.modalAnimation].join(' ');
	return (
		<div
			className={isMobile ? classNameMob : className}
			style={{ display: 'block', borderColor: props.borderColor }}>
			<p>{props.message}</p>
		</div>
	);
};

export default InfoModal;
