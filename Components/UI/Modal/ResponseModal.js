import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect } from '../../../helpers/universalFunctions';

import Input from '../Forms/Input';

import classes from '../UI.module.scss';

const ResponseModal = props => {
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
		props.setIsLoading(false);
	}, [props.showResponseModal.triger]);

	function removeModalHandler() {
		setAnimation(modalAnimationOut);
		props.holdBackdrop ? {} : props.setShowBackdrop(classes.backdropOut);
	}

	return (
		<div
			className={isMobile ? classNameMob : className}
			style={{ borderColor: props.showResponseModal.border }}>
			<p>{props.showResponseModal.message}</p>
			<Input
				type="button"
				value="OK"
				display={props.showButton}
				className={classes.Confirm}
				onClick={() => removeModalHandler()}
			/>
		</div>
	);
};

export default ResponseModal;
