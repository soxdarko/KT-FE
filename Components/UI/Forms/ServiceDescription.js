import { useDeviceDetect } from '../../../helpers/universalFunctions';
import TextArea from './TextArea';
import Input from './Input';

import classes from '../UI.module.scss';
import WrappedButtonsMob from '../WrappedButtonsMob';

const ServiceDescription = props => {
	const { isMobile } = useDeviceDetect();
	const onSubmit = e => {
		e.preventDefault();
		const formData = [
			{
				Id: props.serviceId,
				Name: props.formInput.serviceName.value.trim(),
				Duration: parseInt(props.formInput.duration.value),
				Price:
					typeof props.formInput.price.value === 'string'
						? parseFloat(props.formInput.price.value.trim())
						: props.formInput.price.value,
				Employees: props.checkedEmployees,
				Description: props.formInput.description.value.trim(),
				Deleted: props.formInput.deleted,
			},
		];
		props.setUserServiceData(formData);
		/* props.setIsLoading(true); */
	};

	return (
		<div
			style={{ display: props.displayDescription }}
			className={isMobile ? classes.DescriptionContainerMob : classes.DescriptionContainer}>
			<h3>Dodatne informacije</h3>
			<TextArea
				value={props.formInput.description.value}
				className={classes.DescriptionArea}
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
			<Input type="button" value="sačavaj" display={isMobile ? 'none' : 'block'} />
			<WrappedButtonsMob
				save={onSubmit}
				isMobile={props.displayWrappedButtonsMob(props.displayDescription)}
				displayForward="none"
				displaySave="block"
				displayAdd="none"
				displayStopEdit="block"
				stopEdit={() => {
					props.setDisplayDescription('none');
					props.setShowBackdrop(classes.backdropOut);
					props.setDescriptionEdit(false);
					props.resetForm();
				}}
				validation={true}
			/>
		</div>
	);
};

export default ServiceDescription;
