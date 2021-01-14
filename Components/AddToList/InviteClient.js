import {
	FacebookMessengerShareButton,
	FacebookMessengerIcon,
	ViberShareButton,
	ViberIcon,
	WhatsappShareButton,
	WhatsappIcon,
} from 'react-share';

const InviteClient = () => {
	return (
		<div>
			<div>
				<ViberShareButton url="Ovo je link koji saljem sa tim dugmetom na klik" quote="Deli link">
					<ViberIcon size="inherit" round />
				</ViberShareButton>
				<FacebookMessengerShareButton
					url="Ovo je link koji saljem sa tim dugmetom na klik"
					quote="Deli link">
					<FacebookMessengerIcon size="inherit" round />
				</FacebookMessengerShareButton>
				<WhatsappShareButton
					url="Ovo je link koji saljem sa tim dugmetom na klik"
					quote="Deli link">
					<WhatsappIcon size="inherit" round />
				</WhatsappShareButton>
			</div>
		</div>
	);
};

export default InviteClient;
