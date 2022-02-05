import { useState, useEffect, useRef } from 'react';
import { saveServiceProviders } from '../../api/saveServiceProviders';
import { getAllServiceProviders } from '../../api/getAllServiceProviders';

import QuestionForm from './QuestionForm/QuestionForm';

const ServiceProviderQuestionForm = props => {
	const isComponentLoad = useRef(true);
	const [singleServiceProvider, setSingleServiceProvider] = useState(false);

	const getAllServiceProvidersHandler = async () => {
		const api = await getAllServiceProviders()
			.then(response => {
				const getServiceProviderName = response.data.map(serviceProvider => {
					return serviceProvider;
				});
				props.setServiceProviderData(getServiceProviderName);
			})
			.catch(err => {
				if (err.response) {
					console.log(err.response);
					err.response.data.map(err => {
						props.errorMessage([], err.errorMessage);
					});
				} else if (err.request) {
					props.errorMessage(err.request);
				} else {
					props.errorMessage(err);
				}
			});
		return api;
	};

	const addNewServiceProviderHandler = () => {
		const api = saveServiceProviders([])
			.then(response => {
				console.log(response);
				props.setIsLoading(false);
				props.setDisplayServiceProviderQuestionForm('none');
				props.setDisplayEmployeeQuestionForm('block');
				getAllServiceProvidersHandler();
			})
			.catch(err => {
				if (err.response) {
					console.log(err.response);
					err.response.data.map(err => {
						props.errorMessage([], err.errorMessage);
					});
				} else if (err.request) {
					props.errorMessage(err.request);
				} else {
					props.errorMessage(err);
				}
			});
		api;
	};

	useEffect(() => {
		if (isComponentLoad.current) {
			isComponentLoad.current = false;
			return;
		}
		addNewServiceProviderHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [singleServiceProvider]);

	function onSubmit() {
		props.setDisplayServiceProviderQuestionForm('none');
		props.setDisplayAddServiceProvidersForm('block');
	}

	const singleCompanyHandler = e => {
		e.preventDefault();
		setSingleServiceProvider(true);
		props.setIsLoading(true);
	};

	return (
		<QuestionForm
			title="Da li imate više salona?"
			displayQuestionForm={props.displayServiceProviderQuestionForm}
			onSubmit={() => onSubmit()}
			onDecline={e => singleCompanyHandler(e)}
		/>
	);
};

export default ServiceProviderQuestionForm;
