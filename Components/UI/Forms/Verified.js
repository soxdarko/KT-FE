import { useDeviceDetect } from '../../../helpers/universalFunctions';

import Input from './Input';
import Backdrop from '../Backdrop';
import NavItem from '../../Navigation/NavItem';

import classes from '../UI.module.scss';

const Verified = props => {
	const { isMobile } = useDeviceDetect();
	return (
		<>
			<Backdrop display={props.display} zIndex="499" />
			<div
				className={isMobile ? classes.ResponseMob : classes.Response}
				style={{ display: props.display, borderColor: props.borderColor }}>
				<p>{props.message}</p>
				<NavItem link={props.link} color="transparent">
					<Input type="button" value="OK" className={classes.Confirm} />
				</NavItem>
			</div>
		</>
	);
};

export default Verified;
