import { useDeviceDetect } from '../../helpers/universalFunctions';
import DescriptionLabel from '../UI/DescriptionLabel';
import Input from '../UI/Forms/Input';

import classes from '../SetupForms/SetupForms.module.scss';

const GreetingForm = props => {
	const { isMobile } = useDeviceDetect();
	return (
		<form
			style={{ display: props.displayGreeting }}
			className={isMobile ? classes.GuideFormMob : classes.GuideForm}>
			<h3>Dobrodošli!</h3>
			<DescriptionLabel
				text={
					'Čestitamo na odluci koja će unaprediti Vaše poslovanje. Napisati tekst koji će navesti usera da isprati vodič do kraja'
				}
				className={classes.DesciptionLabel}
				margin="20px 0 50px 0"
				color="orange"
			/>
			<Input
				type="button"
				value="nastavi >>>"
				className={isMobile ? classes.ForwardMob : classes.Forward}
				onClick={() => {
					props.setDisplayGreeting('none'),
						props.setDisplayteamStatusForm('block'),
						props.nextStep();
				}}
			/>
		</form>
	);
};

export default GreetingForm;
