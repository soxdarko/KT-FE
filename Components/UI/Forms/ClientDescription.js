import TextArea from './TextArea';
import Input from './Input';

import classes from '../UI.module.scss';
import WrappedButtonsMob from '../WrappedButtonsMob';

const ClientDescription = props => {
	const onSubmit = e => {
		e.preventDefault();
		const formData = {
			Id: props.clientId,
			Name: props.formInput.name.value.trim(),
			Phone: props.formInput.mobOperator.value + props.formInput.phone.value.trim(),
			Email: props.formInput.email.value.trim(),
			Description: props.formInput.description.value.trim(),
		};
		props.setUserData(formData);
		props.setIsLoading(true);
	};

	return (
		<div style={{ display: props.displayDescription }}>
			<TextArea
				value={props.formInput.description.value}
				setFormInput={props.setFormInput}
				setClientData={props.setClientData}
				className={classes.DescriptionMob}
				minRows="5"
				onChange={e =>
					props.setFormInput({
						...props.formInput,
						['description']: {
							value: e.target.value,
						},
					})
				}
			/>
			<Input type="button" value="sačavaj" />
			<WrappedButtonsMob
				save={onSubmit}
				isMobile={props.displayWrappedButtonsMob(props.displayDescription)}
				displayForward="none"
				displaySave="block"
				displayAdd="none"
				displayStopEdit="block"
				stopEdit={() => {
					props.setDisplayDescription('none'),
						props.setShowBackdrop(classes.backdropOut),
						props.setDescriptionEdit(false),
						props.resetForm();
				}}
			/>
		</div>
	);
};

export default ClientDescription;
