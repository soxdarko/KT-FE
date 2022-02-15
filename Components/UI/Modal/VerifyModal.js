import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect } from '../../../helpers/universalFunctions';
import Link from 'next/link';
import Input from '../Forms/Input';

import classes from '../UI.module.scss';

const VerifyModal = props => {
	const { isMobile } = useDeviceDetect();
	const isComponentLoad = useRef(true);
	const [animation, setAnimation] = useState('');
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const className = [classes.Response, animation].join(' ');
	const classNameMob = [classes.ResponseMob, animation].join(' ');

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}
		setAnimation(modalAnimationIn);
	}, [props.modalTriger]);

	return (
		<div
			className={isMobile ? classNameMob : className}
			style={{ display: props.display, borderColor: props.borderColor }}>
			<p>{props.message}</p>
			<Link href="/">
				<Input
					type="button"
					value="OK"
					className={classes.Confirm}
				/>
			</Link>
		</div>
	);
};

export default VerifyModal;
