const OnChange = (props, e) => {
  props.setState(...props.prevState, { [e.target.name]: e.target.value });
};

export default OnChange;
