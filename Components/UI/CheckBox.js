import classes from './UI.module.scss';

const CheckBox = (props) => (
  <>
    <input type="checkbox" id={props.name} onClick={props.onClick} />
    <label htmlFor={props.name} className={classes.checkbox} />
  </>
);

export default CheckBox;
