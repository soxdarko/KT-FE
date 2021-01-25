import { useState } from 'react';
import { useDeviceDetect } from '../../helpers/universalFunctions';
import TextareaAutosize from 'react-textarea-autosize';
import InputText from '../UI/InputText';
import Title from './Title';
import Submit from '../UI/Submit';

import classes from './HomePage.scss';

const ContactForm = () => {
	const { isMobile } = useDeviceDetect();
	const [message, setMessage] = useState([]);
	const [formValidation, setFormValidation] = useState(true);

	const [messageData, setMessageData] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
	});

	const onChange = e => {
		setMessageData({ ...messageData, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		const contact = {
			name: messageData.name.trim(),
			email: messageData.email.trim(),
			phone: messageData.phone.trim(),
			message: messageData.message.trim(),
		};

		if (
			messageData.name.trim() === '' ||
			messageData.email.trim() === '' ||
			messageData.phone.trim() === '' ||
			messageData.message.trim() === ''
		) {
			alert('Popunite sva polja');
			setFormValidation(false);
		} else {
			setMessage([...message, contact]);
			alert('Hvala na Vašoj poruci. Uskoro ćemo Vam odgovoriti. Vaš KlikTermin tim'),
				setFormValidation(true);
		}
	};

	return (
		<form className={isMobile ? classes.ContactMob : classes.Contact} onSubmit={onSubmit}>
			<Title txt="KONTAKT" top="20px" />
			<h2>Informacije</h2>
			<div className={classes.InfoBg}>
				<p>
					<strong>Email:</strong> office@kliktermin.com
				</p>
				<p>
					<strong>Pomoć i podrška:</strong> 060/492-5469
				</p>
				<p>
					<strong>Marketing:</strong> 069/112-0296
				</p>
			</div>
			<h2>Ostavite nam poruku</h2>
			<InputText
				type="text"
				name="name"
				maxLength="30"
				placeholder="Unesite Ime i Prezime"
				borderColor={formValidation}
				onChange={onChange}
			/>
			<InputText
				type="text"
				name="email"
				maxLength="30"
				placeholder="Unesite E-mail adresu"
				borderColor={formValidation}
				onChange={onChange}
			/>
			<InputText
				type="text"
				name="phone"
				maxLength="10"
				placeholder="Unesite broj telefona"
				borderColor={formValidation}
				onChange={onChange}
			/>
			<TextareaAutosize
				type="textarea"
				name="message"
				maxLength="500"
				className={classes.Message}
				placeholder="Postavite pitanje, napišite sugestiju, ideju, kritiku ili pohvalu"
				style={{ borderColor: formValidation ? 'inherit' : 'red' }}
				minRows={5}
				maxRows={40}
				onChange={onChange}
			/>
			<Submit display="block" value="POŠALJI" onSubmit={onSubmit} />
		</form>
	);
};

export default ContactForm;
