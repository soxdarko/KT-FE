import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import classes from './UI.module.scss';

const AddClientButton = props => (
  <FontAwesomeIcon className={classes.AddClientButton} icon={faUserPlus} onClick={props.onClick}/>
);

export default AddClientButton;
