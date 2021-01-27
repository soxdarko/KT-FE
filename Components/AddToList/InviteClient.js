import classes from './AddToList.scss';

import {
	FacebookMessengerShareButton,
	FacebookMessengerIcon,
	ViberShareButton,
	ViberIcon,
	WhatsappShareButton,
	WhatsappIcon,
} from 'react-share';
import Input from '../UI/Forms/Input';

const InviteClient = props => {
	return (
		<div className={classes.InviteClient} style={{ display: props.display }}>
			<p>Pošaljite klijentu pozivnicu za registraciju. Izaberite aplikaciju.</p>
			<ViberShareButton url="Ovo je link koji saljem sa tim dugmetom na klik" quote="Deli link">
				<ViberIcon className={classes.Icon} round />
			</ViberShareButton>
			<FacebookMessengerShareButton
				url="Ovo je link koji saljem sa tim dugmetom na klik"
				quote="Deli link">
				<FacebookMessengerIcon className={classes.Icon} round />
			</FacebookMessengerShareButton>
			<WhatsappShareButton url="Ovo je link koji saljem sa tim dugmetom na klik" quote="Deli link">
				<WhatsappIcon className={classes.Icon} round />
			</WhatsappShareButton>
			<hr className={classes.line}></hr>
			<p>
				Ukoliko želite da postavite link za registraciju klijenata na društvenu stranicu kliknite na
				dugme ispod.
			</p>
			<Input type="button" value="Kopiraj Link" />
		</div>
	);
};

export default InviteClient;