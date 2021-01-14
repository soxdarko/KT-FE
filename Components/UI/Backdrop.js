import classes from './UI.module.scss';

const Backdrop = (props) => (
  <div
    className={classes.Backdrop}
    style={{ display: props.display }}
    onClick={props.onClick}
  />
);

export default Backdrop;
