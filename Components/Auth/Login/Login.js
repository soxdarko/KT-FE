import { useState, useRef, useEffect } from 'react';
import axios from '../../../utils/Axios/axios-appointments';
import useDeviceDetect from '../../../utils/UseDeviceDetect';
import { updateObject, checkValidity } from '../../shared/utility';
import initState from './initState';

import Input from '../../UI/Forms/Input';

import classes from '../../UI/UI.module.scss';

const Login = (props) => {
  const { isMobile } = useDeviceDetect();
  const isPageLoad = useRef(true);
  const [loginUser, setLoginUser] = useState([]);
  const [formInput, setFormInput] = useState({
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
  });

  const loginHandler = () => {
    const api = axios
      .post('/', loginUser)
      .then((response) => {
        console.log(response), alert('Uspešno ste se prijavili');
      })
      .catch((error) => console.log(error));
    api;
    setFormInput(initState);
  };

  useEffect(() => {
    if (isPageLoad.current) {
      isPageLoad.current = false;
      return;
    }
    loginHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser]);

  const buttonGroup = (
    <>
      <Input
        type="submit"
        name="submit"
        value="PRIJAVI SE"
        placeholder="Uneti lozinku"
        className={classes.SubmitButton}
        display="block"
        width="70%"
        height="40px"
        margin="40px auto 5px auto"
      />
      <Input
        type="button"
        name="register"
        value="REGISTRUJ SE"
        placeholder="Uneti lozinku"
        className={isMobile ? classes.FormButtonMob : classes.FormButton}
        display="block"
        width="70%"
        height="40px"
        margin="40px auto 5px auto"
        onClick={() => {
          props.setDisplayLogin('none'),
            props.setDisplayRegServProv('block'),
            setFormInput(initState);
        }}
      />
      <Input
        type="button"
        name="passRecovery"
        value="ZABORAVLJENA LOZINKA"
        placeholder="Uneti lozinku"
        className={isMobile ? classes.FormButtonMob : classes.FormButton}
        display="block"
        width="70%"
        height="40px"
        margin="40px auto 5px auto"
        onClick={() => {
          props.setDisplayLogin('none'),
            props.setDisplayPassRecovery('block'),
            setFormInput(initState);
        }}
      />
      <Input
        type="button"
        name="formClose"
        value="ODUSTANI"
        placeholder="Uneti lozinku"
        className={isMobile ? classes.FormButtonMob : classes.FormButton}
        display="block"
        width="70%"
        height="40px"
        margin="40px auto 5px auto"
        onClick={() => {
          props.setDisplayLogin('none'), setFormInput(initState);
        }}
      />
    </>
  );

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
      userName: formInput.userName.value.trim(),
      password: formInput.password.value.trim(),
    };
    if (!formInput.userName.value.trim()) {
      setFormInput({
        ...formInput,
        userName: {
          value: '',
          valid: false,
        },
      });
      alert('Morate uneti korisničko ime');
    } else if (!formInput.password.value.trim()) {
      setFormInput({
        ...formInput,
        password: {
          value: '',
          valid: false,
        },
      });
      alert('Morate uneti lozinku');
    } else {
      setLoginUser([...loginUser, formData]);
      props.setDisplayLogin('none');
    }
  };

  const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;
  return (
    <form
      style={{ display: props.displayLogin }}
      className={classes.Form}
      onSubmit={onSubmit}
    >
      <h2 className={classes.FormTitle}>PRIJAVA KORISNIKA</h2>
      <Input
        type="text"
        name="username"
        value={formInput.userName.value}
        placeholder="UNESITE EMAIL ili TELEFON"
        className={inputClassName}
        onChange={(e) => inputChangedHandler(e, 'userName')}
        invalid={!formInput.userName.valid}
      />
      <Input
        type="password"
        name="password"
        value={formInput.password.value}
        placeholder="UNESITE LOZINKU"
        className={inputClassName}
        onChange={(e) => inputChangedHandler(e, 'password')}
        invalid={!formInput.password.valid}
      />
      {buttonGroup}
    </form>
  );
};

export default Login;
