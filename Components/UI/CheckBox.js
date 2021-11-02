import classes from './UI.module.scss';

const CheckBox = props => (
	<>
		<input
			type="checkbox"
			id={props.name}
			onClick={props.onClick}
			className={props.className}
			defaultChecked={props.defaultChecked}
		/>
		<label htmlFor={props.name} />
	</>
);

export default CheckBox;
