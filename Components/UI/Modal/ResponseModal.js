import { useState } from 'react';
import { useDeviceDetect } from '../../../helpers/universalFunctions';

import Input from '../Forms/Input';
import Backdrop from '../Backdrop';

import classes from '../UI.module.scss';

const ResponseModal = props => {
	const { isMobile } = useDeviceDetect();

	const className = [classes.Response, props.modalAnimation].join(' ');
	const classNameMob = [classes.ResponseMob, props.modalAnimation].join(' ');
	return (
		<>
			<Backdrop backdropAnimation={props.backdropAnimation} zIndex="89999" />
			<div
				className={isMobile ? classNameMob : className}
				style={{ borderColor: props.borderColor }}>
				<p>{props.message}</p>
				<Input type="button" value="OK" className={classes.Confirm} onClick={props.onClick} />
			</div>
		</>
	);
};

export default ResponseModal;
