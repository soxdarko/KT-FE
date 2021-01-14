import { useState, useRef, useEffect } from 'react';
import axios from '../../utils/Axios/axios-appointments';
import useDeviceDetect from '../../utils/UseDeviceDetect';

import Select from '../UI/Select';
import Input from '../UI/Forms/Input';

import classes from '../UI/UI.module.scss';

const RegClient = (props) => {
  const { isMobile } = useDeviceDetect();
  const isPageLoad = useRef(true);
  const [formValidation, setFormValidation] = useState(true);
  const [clientRegistration, setClientRegistration] = useState([]);

  const [newClient, setNewClient] = useState({
    name: '',
    mobOperator: '',
    phone: '',
    email: '',
    userName: '',
    password: '',
    passConfirm: '',
  });

  const onChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const addedClient = {
      name: newClient.name.trim(),
      mobOperator: newClient.mobOperator.trim(),
      phone: newClient.phone.trim(),
      email: newClient.email.trim(),
      userName: newClient.userName.trim(),
      password: newClient.password.trim(),
      passConfirm: newClient.passConfirm.trim(),
    };

    if (
      newClient.name.trim() === '' ||
      newClient.phone.trim() === '' ||
      newClient.email.trim() === '' ||
      newClient.userName.trim() === '' ||
      newClient.password.trim() === '' ||
      newClient.passConfirm.trim() === ''
    ) {
      alert('Popunite sva polja');
      setFormValidation(false);
    } else if (newClient.password.trim() !== newClient.passConfirm.trim()) {
      alert('Lozinka i ponovljena lozinka nisu jednake');
      setFormValidation(false);
    } else {
      setClientRegistration([...clientRegistration, addedClient]);
      props.setDisplayRegClient('none');
      alert('Uspešno ste se registrovali');
      setFormValidation(true);
      props.setPagePosition('relative');
    }
  };

  const regHandler = () => {
    const api = axios
      .post('/regClient.json', clientRegistration)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    api;
  };

  useEffect(() => {
    if (isPageLoad.current) {
      isPageLoad.current = false;
      return;
    }
    regHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientRegistration]);

  if (isMobile) {
    return (
      <form
        style={{ display: props.displayRegClient }}
        className={classes.Form}
        onSubmit={onSubmit}
      >
        <h2 className={classes.FormTitle}>REGISTRACIJA KLIJENTA</h2>
        <Input
          type="text"
          name="name"
          className={classes.InputTextMob}
          borderColor={formValidation}
          placeholder="UNETI IME I PREZIME"
          value={clientRegistration.name}
          onChange={onChange}
        />
        <Select
          type="text"
          name="mobOperator"
          className={classes.MobileOperatorMob}
          borderColor={formValidation}
          placeholder="064"
          value={clientRegistration.mobOperator}
          onChange={onChange}
        >
          <option>060</option>
          <option>061</option>
          <option>062</option>
          <option>063</option>
          <option>064</option>
          <option>065</option>
          <option>066</option>
          <option>069</option>
        </Select>
        <Input
          type="text"
          name="phone"
          className={classes.PhoneNumberMob}
          borderColor={formValidation}
          placeholder="UNESITE TELEFON"
          value={clientRegistration.phone}
          onChange={onChange}
        />
        <Input
          type="text"
          name="email"
          className={classes.InputTextMob}
          borderColor={formValidation}
          placeholder="UNESITE EMAIL"
          value={clientRegistration.email}
          onChange={onChange}
        />
        <Input
          type="text"
          name="userName"
          className={classes.InputTextMob}
          borderColor={formValidation}
          placeholder="UNESITE KORISNIČKO IME"
          value={clientRegistration.userName}
          onChange={onChange}
        />
        <Input
          type="password"
          name="password"
          className={classes.InputTextMob}
          borderColor={formValidation}
          placeholder="IZABERITE LOZINKU"
          value={clientRegistration.password}
          onChange={onChange}
        />
        <Input
          type="password"
          name="passConfirm"
          className={classes.InputTextMob}
          borderColor={formValidation}
          placeholder="PONOVO UNESITE LOZINKU"
          value={clientRegistration.passConfirm}
          onChange={onChange}
        />
        <Input
          type="submit"
          value="REGISTRUJ SE"
          width="48%"
          float="left"
          margin="20px auto 5px auto"
          className={classes.SubmitButtonMob}
          onSubmit={onSubmit}
        />
        <Input
          type="button"
          value="NAZAD"
          float="right"
          width="48%"
          margin="20px auto 5px auto"
          className={classes.FormButtonCloseMob}
          onClick={() => {
            props.setDisplayRegClient('none'),
              props.setDisplayRegAs('block'),
              setFormValidation(true);
          }}
        />
      </form>
    );
  }
  return (
    <form
      style={{ display: props.displayRegClient }}
      className={classes.Form}
      onSubmit={onSubmit}
    >
      <h2 className={classes.FormTitle}>REGISTRACIJA KLIJENTA</h2>
      <Input
        type="text"
        name="name"
        className={classes.InputText}
        margin="40px auto 5px auto"
        borderColor={formValidation}
        placeholder="Uneti ime i prezime"
        value={clientRegistration.name}
        onChange={onChange}
      />
      <Select
        name="mobOperator"
        className={classes.MobileOperator}
        borderColor={formValidation}
        placeholder="064"
        value={clientRegistration.mobOperator}
        onChange={onChange}
      >
        <option>060</option>
        <option>061</option>
        <option>062</option>
        <option>063</option>
        <option>064</option>
        <option>065</option>
        <option>066</option>
        <option>069</option>
      </Select>
      <Input
        type="text"
        name="phone"
        className={classes.PhoneNumber}
        borderColor={formValidation}
        placeholder="Uneti telefon"
        value={clientRegistration.phone}
        onChange={onChange}
      />
      <Input
        type="text"
        name="email"
        className={classes.InputText}
        borderColor={formValidation}
        placeholder="Uneti e-mail"
        value={clientRegistration.email}
        onChange={onChange}
      />
      <Input
        type="text"
        name="userName"
        className={classes.InputText}
        borderColor={formValidation}
        placeholder="Uneti korisnič"
        value={clientRegistration.userName}
        onChange={onChange}
      />
      <Input
        type="password"
        name="password"
        className={classes.InputText}
        borderColor={formValidation}
        placeholder="Izabrati lozinku"
        value={clientRegistration.password}
        onChange={onChange}
      />
      <Input
        type="password"
        name="passConfirm"
        className={classes.InputText}
        borderColor={formValidation}
        placeholder="Ponovo uneti lozinku"
        value={clientRegistration.passConfirm}
        onChange={onChange}
      />
      <Input
        type="submit"
        value="REGISTRUJ SE"
        display="block"
        margin="40px auto 5px auto"
        className={classes.SubmitButton}
        onSubmit={onSubmit}
      />
      <Input
        type="button"
        value="NAZAD"
        display="block"
        margin="20px auto 5px auto"
        color="orangered"
        className={classes.FormButton}
        onClick={() => {
          props.setDisplayRegClient('none'),
            props.setDisplayRegAs('block'),
            setFormValidation(true);
        }}
      />
    </form>
  );
};

export default RegClient;
