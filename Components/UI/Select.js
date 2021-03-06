import classes from './UI.module.scss';

const Select = (props) => {
  const inputClasses = [props.className];

  if (props.invalid) {
    inputClasses.push(classes.InvalidInput);
  }

  return (
    <select
      name={props.nameSelect}
      id={props.idSelect}
      value={props.value}
      className={inputClasses.join(' ')}
      style={{
        display: props.displaySelect,
      }}
      onChange={props.onChange}
    >
      {props.children}
    </select>
  );
};

export default Select;
