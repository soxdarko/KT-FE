import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect } from '../../../helpers/universalFunctions';

import classes from '../UI.module.scss';

const InfoModal = props => {
	const { isMobile } = useDeviceDetect();
	const isComponentLoad = useRef(true);
	const [animation, setAnimation] = useState('');
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const className = [classes.Response, animation].join(' ');
	const classNameMob = [classes.ResponseMob, animation].join(' ');

	const completnessMessageHandler = () => {
		setAnimation(modalAnimationIn);
		setTimeout(() => {
			setAnimation(modalAnimationOut);
		}, 2000);
	};

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}
		completnessMessageHandler();
	}, [props.showInfoModal]);

	return (
		<div
			className={isMobile ? classNameMob : className}
			style={{ display: 'block', borderColor: props.borderColor }}>
			<p>{props.message}</p>
		</div>
	);
};

export default InfoModal;
