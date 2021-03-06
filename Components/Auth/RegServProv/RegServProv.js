import { useState, useRef, useEffect } from 'react';
import axios from '../../../utils/Axios/axios-appointments';
import useDeviceDetect from '../../../utils/UseDeviceDetect';
import {
  updateObject,
  checkValidity,
  updateValidity,
} from '../../shared/utility';
import initState from './initState';

import Select from '../../UI/Select';
import Input from '../../UI/Forms/Input';

import classes from '../../UI/UI.module.scss';

const RegServProv = (props) => {
  const { isMobile } = useDeviceDetect();
  const isPageLoad = useRef(true);
  const [regCompany, setRegCompany] = useState({});

  const [formInput, setFormInput] = useState({
    name: {
      value: '',
      touched: false,
      valid: true,
    },
    companyName: {
      value: '',
      touched: false,
      valid: true,
    },
    address: {
      value: '',
      touched: false,
      valid: true,
    },
    city: {
      value: '',
      touched: false,
      valid: true,
    },
    mobOperator: {
      value: '',
      touched: false,
      valid: true,
    },
    phone: {
      value: '',
      touched: false,
      valid: true,
    },
    email: {
      value: '',
      touched: false,
      valid: true,
    },
    userName: {
      value: '',
      touched: false,
      valid: true,
    },
    password: {
      value: '',
      touched: false,
      valid: true,
    },
    passConfirm: {
      value: '',
      touched: false,
      valid: true,
    },
  });

  const regHandler = () => {
    const api = axios
      .post('/users/companyRegistration', regCompany)
      .then((response) => {
        console.log(response), alert('Uspešno ste se registrovali');
      })
      .catch((error) => console.log(regCompany));
    api;
    setFormInput(initState);
  };

  useEffect(() => {
    if (isPageLoad.current) {
      isPageLoad.current = false;
      return;
    }
    regHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regCompany]);

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

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: formInput.name.value.trim(),
      companyName: formInput.companyName.value.trim(),
      email: formInput.email.value.trim(),
      phone: formInput.mobOperator.value + formInput.phone.value.trim(),
      userName: formInput.userName.value.trim(),
      password: formInput.password.value.trim(),
      city: formInput.city.value.trim(),
      /* address: formInput.address.value.trim(), */
    };

    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const numericPattern = /^\d+$/;
    if (!formInput.name.value.trim()) {
      updateValidity(setFormInput, 'name', formInput, '', false);
      alert('Morate uneti Ime i prezime');
    } else if (!formInput.userName.value.trim()) {
      updateValidity(setFormInput, 'userName', formInput, '', false);
      alert('Morate uneti korisničko ime');
    } else if (!formInput.companyName.value.trim()) {
      updateValidity(setFormInput, 'companyName', formInput, '', false);
      alert('Morate uneti naziv firme');
    } else if (!formInput.city.value.trim()) {
      updateValidity(setFormInput, 'city', formInput, '', false);
      alert('Morate uneti grad');
    } else if (!formInput.mobOperator.value) {
      updateValidity(setFormInput, 'mobOperator', formInput, '', false);
      alert('Morate izabrati pozivni broj');
    } else if (
      !formInput.phone.value.trim() ||
      !numericPattern.test(formInput.phone.value) ||
      formInput.phone.value.length < 6
    ) {
      updateValidity(setFormInput, 'phone', formInput, '', false);
      alert('Morate uneti validan broj telefona');
    } else if (
      !formInput.email.value.trim() ||
      !emailPattern.test(formInput.email.value)
    ) {
      updateValidity(setFormInput, 'email', formInput, '', false);
      alert('Morate uneti validnu e-mail adresu');
    } else if (!formInput.password.value.trim()) {
      updateValidity(setFormInput, 'password', formInput, '', false);
      alert('Morate uneti lozinku');
    } else if (!formInput.passConfirm.value.trim()) {
      updateValidity(setFormInput, 'passConfirm', formInput, '', false);
      alert('Morate uneti potvrdu izabrane lozinke');
    } else if (
      formInput.password.value.trim() !== formInput.passConfirm.value.trim()
    ) {
      setFormInput({
        ...formInput,
        password: {
          value: '',
          valid: false,
        },
        passConfirm: {
          value: '',
          valid: false,
        },
      });
      alert('Lozinka i potvrda moraju biti jednake');
    } else {
      setRegCompany(formData);
      props.setDisplayRegServProv('none');
    }
  };

  const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
  return (
    <form
      style={{ display: props.displayRegServProv, position: 'absolute' }}
      className={classes.Form}
      onSubmit={onSubmit}
    >
      <h2 className={classes.FormTitle}>REGISTRACIJA PRUŽAOCA USLUGA</h2>
      <Input
        type="text"
        name="name"
        className={inputClassName}
        placeholder="Uneti ime i prezime"
        value={formInput.name.value}
        maxLength="50"
        onChange={(e) => inputChangedHandler(e, 'name')}
        invalid={!formInput.name.valid}
      />
      <Input
        type="text"
        name="userName"
        className={inputClassName}
        placeholder="Uneti korisničko ime"
        value={formInput.userName.value}
        maxLength="50"
        onChange={(e) => inputChangedHandler(e, 'userName')}
        invalid={!formInput.userName.valid}
      />
      <Input
        type="text"
        name="companyName"
        className={inputClassName}
        placeholder="Uneti naziv firme"
        value={formInput.companyName.value}
        maxLength="50"
        onChange={(e) => inputChangedHandler(e, 'companyName')}
        invalid={!formInput.companyName.valid}
      />
      <Input
        type="text"
        name="address"
        className={inputClassName}
        placeholder="Uneti adresu firme"
        value={formInput.address.value}
        maxLength="50"
        onChange={(e) => inputChangedHandler(e, 'address')}
      />
      <Input
        type="text"
        name="city"
        className={inputClassName}
        placeholder="Uneti grad"
        value={formInput.city.value}
        maxLength="40"
        onChange={(e) => inputChangedHandler(e, 'city')}
        invalid={!formInput.city.valid}
      />
      <Select
        name="mobOperator"
        className={
          isMobile ? classes.MobileOperatorMob : classes.MobileOperator
        }
        display="inline-block"
        value={formInput.mobOperator.value}
        onChange={(e) => inputChangedHandler(e, 'mobOperator')}
        invalid={!formInput.mobOperator.valid}
      >
        <option value="060">060</option>
        <option value="061">061</option>
        <option value="062">062</option>
        <option value="063">063</option>
        <option value="064">064</option>
        <option value="065">065</option>
        <option value="066">066</option>
        <option value="069">069</option>
      </Select>
      <Input
        type="number"
        name="phone"
        className={isMobile ? classes.PhoneNumberMob : classes.PhoneNumber}
        placeholder="Uneti telefon"
        value={formInput.phone.value}
        maxLength="7"
        onChange={(e) => inputChangedHandler(e, 'phone')}
        invalid={!formInput.phone.valid}
      />
      <Input
        type="text"
        name="email"
        className={inputClassName}
        placeholder="Uneti e-mail"
        value={formInput.email.value}
        maxLength="50"
        onChange={(e) => inputChangedHandler(e, 'email')}
        invalid={!formInput.email.valid}
      />
      <Input
        type="password"
        name="password"
        className={inputClassName}
        placeholder="Izabrati lozinku"
        value={formInput.password.value}
        maxLength="50"
        onChange={(e) => inputChangedHandler(e, 'password')}
        invalid={!formInput.password.valid}
      />
      <Input
        type="password"
        name="passConfirm"
        className={inputClassName}
        placeholder="Ponovo uneti lozinku"
        value={formInput.passConfirm.value}
        maxLength="50"
        onChange={(e) => inputChangedHandler(e, 'passConfirm')}
        invalid={!formInput.passConfirm.valid}
      />
      <Input
        type="submit"
        value="REGISTRUJ SE"
        display="block"
        width={isMobile ? '48%' : 'inherit'}
        float={isMobile ? 'left' : 'inherit'}
        margin={isMobile ? '20px auto 5px auto' : '40px auto 5px auto'}
        className={isMobile ? classes.SubmitButtonMob : classes.SubmitButton}
      />
      <Input
        type="button"
        value="NAZAD"
        display="block"
        float={isMobile ? 'right' : 'inherit'}
        width={isMobile ? '48%' : 'inherit'}
        margin="20px auto 5px auto"
        color="orangered"
        className={isMobile ? classes.FormButtonCloseMob : classes.FormButton}
        onClick={() => {
          props.setDisplayRegServProv('none'), setFormInput(initState);
        }}
      />
    </form>
  );
};

export default RegServProv;
