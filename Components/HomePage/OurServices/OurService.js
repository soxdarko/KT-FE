import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseDeviceDetect } from '../../../helpers/universalFunctions';

import classes from '../HomePage.module.scss';

const OurService = props => {
	const { isMobile } = UseDeviceDetect();
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

export default OurService;
