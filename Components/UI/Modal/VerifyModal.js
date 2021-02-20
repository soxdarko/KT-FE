import { useDeviceDetect } from '../../../helpers/universalFunctions';

import Input from '../Forms/Input';
import Backdrop from '../Backdrop';
import NavItem from '../../Navigation/NavItem';

import classes from '../UI.module.scss';

const VerifyModal = props => {
	const { isMobile } = useDeviceDetect();
	const className = [classes.Response, props.modalAnimation].join(' ');
	const classNameMob = [classes.ResponseMob, props.modalAnimation].join(' ');
	return (
		<>
			<Backdrop display="block" zIndex="499" />
			<div
				className={isMobile ? classNameMob : className}
				style={{ display: props.display, borderColor: props.borderColor }}>
				<p>{props.message}</p>
				<NavItem link={props.link} color="transparent">
					<Input
						type="button"
						value="OK"
						className={classes.Confirm} /* onClick={props.onClick} */
					/>
				</NavItem>
			</div>
		</>
	);
};

export default VerifyModal;
