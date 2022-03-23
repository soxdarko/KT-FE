//REFAKTURISANO
import { useState, useRef, useEffect } from 'react'
import {
  useDeviceDetect,
  updateValidity,
  inputChangedHandler,
  responseHandler,
} from '../../../helpers/universalFunctions'
import initState from './initState'

import Input from '../../UI/Forms/Input'
import Title from '../Title'
import TextArea from '../../UI/Forms/TextArea'

import classes from '../HomePage.module.scss'

const ContactForm = (props) => {
  const { isMobile } = useDeviceDetect()
  const isPageLoad = useRef(true)
  const [message, setMessage] = useState([])

  const [formInput, setFormInput] = useState(initState)

  const inputValidityHandler = (inputName, message) => {
    updateValidity(props.setFormInput, props.formInput, inputName, '', false)
    responseHandler(
      props.setShowResponseModal,
      message,
      'red',
      !props.showResponseModal.triger,
    )
  }

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
      isPageLoad.current = false
      return
    }
    /*  regHandler(); */
  }, [message])

  /* const inputChangedHandler = (e, inputIdentifier) => {
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
	}; */

  // Function for limit maxLength for input type='number'
  const maxLengthCheck = (element) => {
    if (element.target.value.length > element.target.maxLength) {
      element.target.value = element.target.value.slice(
        0,
        element.target.maxLength,
      )
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = {
      name: formInput.name.value.trim(),
      email: formInput.email.value.trim(),
      phone: formInput.phone.value.trim(),
      message: formInput.message.value.trim(),
    }

    const emailPattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const numericPattern = /^\d+$/
    if (!formInput.name.value.trim()) {
      inputValidityHandler('name', 'Morate uneti Ime i prezime!')
    } else if (
      !formInput.email.value.trim() ||
      !emailPattern.test(formInput.email.value)
    ) {
      inputValidityHandler('email', 'Morate uneti validnu e-mail adresu!')
    } else if (
      !formInput.phone.value.trim() ||
      !numericPattern.test(formInput.phone.value) ||
      formInput.phone.value.length < 9
    ) {
      inputValidityHandler('phone', 'Morate uneti validan broj telefona!')
    } else if (!formInput.message.value.trim()) {
      inputValidityHandler('message', 'Morate uneti tekst poruke!')
    } else {
      setMessage(formData)
    }
  }

  return (
    <form
      className={isMobile ? classes.ContactMob : classes.Contact}
      onSubmit={onSubmit}
    >
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
        onChange={(e) =>
          inputChangedHandler(e, 'name', formInput, setFormInput)
        }
        invalid={!formInput.name.valid}
      />
      <Input
        type="text"
        name="email"
        maxLength="50"
        placeholder="Unesite E-mail adresu"
        className={classes.Contact_Input}
        onChange={(e) =>
          inputChangedHandler(e, 'email', formInput, setFormInput)
        }
        invalid={!formInput.email.valid}
      />
      <Input
        type="number"
        name="phone"
        maxLength="10"
        placeholder="Unesite broj telefona"
        className={classes.Contact_Input}
        onChange={(e) =>
          inputChangedHandler(e, 'phone', formInput, setFormInput)
        }
        invalid={!formInput.phone.valid}
      />
      <TextArea
        name="message"
        maxLength="500"
        placeholder="Postavite pitanje, napišite sugestiju, ideju, kritiku ili pohvalu"
        minRows="5"
        maxRows="40"
        className={classes.Contact_Input}
        onChange={(e) =>
          inputChangedHandler(e, 'message', formInput, setFormInput)
        }
        invalid={!formInput.message.valid}
      />
      <Input
        type="submit"
        className={classes.Submit}
        display="block"
        value="POŠALJI"
      />
    </form>
  )
}

export default ContactForm
