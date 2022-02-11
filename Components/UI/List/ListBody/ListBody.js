import { UseDeviceDetect } from '../../../../helpers/universalFunctions';

import classes from '../../UI.module.scss';

const ListBody = props => {
	const { isMobile } = UseDeviceDetect();
	return <div className={isMobile ? classes.ListBodyMob : classes.ListBody}>{props.children}</div>;
};

export default ListBody;
