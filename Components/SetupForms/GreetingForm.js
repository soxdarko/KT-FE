import { useDeviceDetect } from '../../helpers/universalFunctions';
import { getAllServiceProviders } from '../../api/getAllServiceProviders';

import DescriptionLabel from '../UI/DescriptionLabel';
import Input from '../UI/Forms/Input';

import classes from '../SetupForms/SetupForms.module.scss';

const GreetingForm = props => {
	const { isMobile } = useDeviceDetect();

	const forward = async () => {
		props.setDisplayGreeting('none');
		if (props.isServiceProvider) {
			props.setDisplayEmployeeQuestionForm('block');
		} else {
			props.setDisplayServiceProviderQuestionForm('block');
		}
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
				type="button"
				value="nastavi >>>"
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => forward()}
			/>
		</div>
	);
};

export default GreetingForm;
