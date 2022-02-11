import { UseDeviceDetect } from '../../helpers/universalFunctions';

import classes from './HomePage.module.scss';

const Title = props => {
	const { isMobile } = UseDeviceDetect();
	return (
		<h1 className={isMobile ? classes.TitleMob : classes.Title} style={{ top: props.top }}>
			{props.txt}
		</h1>
	);
};

export default Title;
