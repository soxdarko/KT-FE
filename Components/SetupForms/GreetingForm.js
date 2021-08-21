import { useDeviceDetect } from '../../helpers/universalFunctions';

import DescriptionLabel from '../UI/DescriptionLabel';
import Input from '../UI/Forms/Input';
import WrappedButtonsMob from '../UI/WrappedButtonsMob';

import classes from '../SetupForms/SetupForms.module.scss';

const GreetingForm = props => {
	const { isMobile } = useDeviceDetect();

	const forward = async () => {
		props.setDisplayGreeting('none');
		props.setDisplayServiceProviderQuestionForm('block');
	};

	return (
		<div style={{ display: props.displayGreeting }}>
			<form className={isMobile ? classes.GuideFormMob : classes.GuideForm}>
				<h3>Dobrodošli!</h3>
				<DescriptionLabel
					text={
						props.isServiceProvider
							? 'Naš smart vodič će Vam pomoći da prilagodite KlikTermin svojim potrebama'
							: 'Čestitamo na odluci koja će unaprediti Vaše poslovanje. Napisati tekst koji će navesti usera da isprati vodič do kraja'
					}
					className={classes.DesciptionLabel}
					margin="20px 0 50px 0"
					color="orange"
				/>
			</form>
			<Input
				display={isMobile ? 'none' : 'inline-block'}
				type="button"
				value="nastavi >>>"
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => forward()}
			/>
			<WrappedButtonsMob
				forward={forward}
				isMobile={isMobile}
				displayForward="block"
				displaySave="none"
				displayAdd="none"
				displayStopEdit="none"
			/>
		</div>
	);
};

export default GreetingForm;
