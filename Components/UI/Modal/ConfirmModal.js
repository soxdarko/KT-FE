import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect } from '../../../helpers/universalFunctions';
import Input from '../Forms/Input';

import classes from '../UI.module.scss';

const ConfirmModal = props => {
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
		props.holdBackdrop ? {} : props.setShowBackdrop(classes.backdropOut);
	}

	return (
		<div
			className={isMobile ? classNameMob : className}
			style={{ display: 'block', borderColor: '#FDFD96' }}>
			<p>{props.message}</p>
			<Input
				type="button"
				value={props.submitValue}
				onClick={() => {
					props.onSubmit();
					setAnimation(modalAnimationOut);
				}}
				className={classes.Confirm}
			/>
			<Input
				type="button"
				value="ODUSTANI"
				onClick={() => {
					removeModalHandler();
					props.onCancel();
				}}
				className={classes.Decline}
			/>
		</div>
	);
};

export default ConfirmModal;
