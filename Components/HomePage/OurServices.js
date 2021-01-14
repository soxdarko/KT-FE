import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDeviceDetect from '../../utils/UseDeviceDetect';

import classes from './HomePage.scss';

const OurServices = props => {
	const { isMobile } = useDeviceDetect();
	return (
		<div className={isMobile ? classes.OurServicesMob : classes.OurServices}>
			<div className={classes.Icon}>
				<FontAwesomeIcon icon={props.Icon} />
			</div>
			<div className={classes.txtContainer}>
				<h4>{props.title}</h4>
				<p>{props.txt}</p>
			</div>
		</div>
	);
};

export default OurServices;
