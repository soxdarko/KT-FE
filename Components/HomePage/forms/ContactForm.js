/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
/* import axios from '../../../utils/Axios/axios-appointments'; */
import useDeviceDetect from '../../../utils/UseDeviceDetect';
import { updateObject, checkValidity, updateValidity } from '../../shared/utility';
import initState from './initState';

import Input from '../../UI/Forms/Input';
import Title from '../Title';
import TextArea from '../../UI/Forms/TextArea';

import classes from '../HomePage.scss';

const ContactForm = () => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const [message, setMessage] = useState([]);

	const [formInput, setFormInput] = useState({
		name: {
			value: '',
			touched: false,
			valid: true,
		},
		email: {
			value: '',
			touched: false,
			valid: true,
		},
		phone: {
			value: '',
			touched: false,
			valid: true,
		},
		message: {
			value: '',
			touched: false,
			valid: true,
		},
	});

	/* const regHandler = () => {
    const api = axios */
	/* .post('/users/companyRegistration', regCompany) */
	/* .then((response) => {
        console.log(response),
          alert(
            'Vaša poruka je primljena, odgovorićemo Vam u najkraćem mogućem roku'
          );
      })
      .catch((error) => console.log(error));
    api;
    setFormInput(initState); */
	/*   }; */

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		/*  regHandler(); */
	}, [message]);

	const inputChangedHandler = (e, inputIdentifier) => {
		const updatedFormElement = updateObject(formInput[inputIdentifier], {
			value: e.target.value,
			valid: checkValidity(e.target.value, formInput[inputIdentifier]),
			touched: true,
		});

		setFormInput(
			updateObject(formInput, {
				[inputIdentifier]: updatedFormElement,
			})
		);
	};

	// Function for limit maxLength for input type='number'
	const maxLengthCheck = element => {
		if (element.target.value.length > element.target.maxLength) {
			element.target.value = element.target.value.slice(0, element.target.maxLength);
		}
	};

	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			name: formInput.name.value.trim(),
			email: formInput.email.value.trim(),
			phone: formInput.phone.value.trim(),
			message: formInput.message.value.trim(),
		};

		const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		const numericPattern = /^\d+$/;
		if (!formInput.name.value.trim()) {
			updateValidity(setFormInput, 'name', formInput, '', false);
			alert('Morate uneti Ime i prezime');
		} else if (!formInput.email.value.trim() || !emailPattern.test(formInput.email.value)) {
			updateValidity(setFormInput, 'email', formInput, '', false);
			alert('Morate uneti validnu e-mail adresu');
		} else if (
			!formInput.phone.value.trim() ||
			!numericPattern.test(formInput.phone.value) ||
			formInput.phone.value.length < 9
		) {
			updateValidity(setFormInput, 'phone', formInput, '', false);
			alert('Morate uneti validan broj telefona');
		} else if (!formInput.message.value.trim()) {
			updateValidity(setFormInput, 'message', formInput, '', false);
			alert('Morate uneti poruku');
		} else {
			setMessage(formData);
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
			<Input
				type="text"
				name="name"
				maxLength="30"
				placeholder="Unesite Ime i Prezime"
				className={classes.Contact_Input}
				onChange={e => inputChangedHandler(e, 'name')}
				invalid={!formInput.name.valid}
			/>
			<Input
				type="text"
				name="email"
				maxLength="50"
				placeholder="Unesite E-mail adresu"
				className={classes.Contact_Input}
				onChange={e => inputChangedHandler(e, 'email')}
				invalid={!formInput.email.valid}
			/>
			<Input
				type="number"
				name="phone"
				maxLength="10"
				placeholder="Unesite broj telefona"
				className={classes.Contact_Input}
				onChange={e => inputChangedHandler(e, 'phone')}
				invalid={!formInput.phone.valid}
			/>
			<TextArea
				name="message"
				maxLength="500"
				placeholder="Postavite pitanje, napišite sugestiju, ideju, kritiku ili pohvalu"
				minRows="5"
				maxRows="40"
				className={classes.Contact_Input}
				onChange={e => inputChangedHandler(e, 'message')}
				invalid={!formInput.message.valid}
			/>
			<Input type="submit" className={classes.Submit} display="block" value="POŠALJI" />
		</form>
	);
};

export default ContactForm;
