const Button = (props) => (
  <input
    type="button"
    value={props.value}
    className={props.classNameButton}
    onClick={props.onClick}
    style={{
      display: props.display,
      width: props.width,
      height: props.height,
      margin: props.margin,
      float: props.float,
      fontSize: props.fontSize,
      color: props.color,
    }}
  />
);

export default Button;
