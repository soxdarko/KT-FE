import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect } from '../../../helpers/universalFunctions';

import Input from '../Forms/Input';
import Backdrop from '../Backdrop';
import NavItem from '../../Navigation/NavItem';

import classes from '../UI.module.scss';

const VerifyModal = props => {
	const { isMobile } = useDeviceDetect();
	const isComponentLoad = useRef(true);
	const [animation, setAnimation] = useState('');
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const className = [classes.Response, animation].join(' ');
	const classNameMob = [classes.ResponseMob, animation].join(' ');

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}
		setAnimation(modalAnimationIn);
	}, [props.modalTriger]);

	function removeModalHandler() {
		setAnimation(modalAnimationOut);
		props.setShowBackdrop(classes.backdropOut);
	}

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
						className={classes.Confirm}
						onClick={() => {
							props.onClick();
							removeModalHandler();
						}}
					/>
				</NavItem>
			</div>
		</>
	);
};

export default VerifyModal;
